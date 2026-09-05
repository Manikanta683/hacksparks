import { useEffect, useMemo, useState } from 'react';
import {
  Sparkles,
  Zap,
  Save,
  Trash2,
  RefreshCw,
  ArrowRight,
  Github,
  Rocket,
  Lightbulb,
  Copy,
  Check,
  Code2,
  Layers,
  Trophy,
} from 'lucide-react';
import { supabase, type ProjectIdea } from '@/lib/supabase';
import { TRACKS, generateIdea, generateRandomIdea, type GeneratedIdea } from '@/lib/generator';

type Tab = 'generate' | 'saved';

function App() {
  const [tab, setTab] = useState<Tab>('generate');
  const [selectedTrack, setSelectedTrack] = useState<string>('ai');
  const [idea, setIdea] = useState<GeneratedIdea>(() => generateIdea('ai'));
  const [spinning, setSpinning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState<ProjectIdea[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadSaved = async () => {
    const { data, error } = await supabase
      .from('project_ideas')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setLoadError('Could not load saved ideas. Please try again.');
      return;
    }
    setLoadError(null);
    setSaved((data as ProjectIdea[]) ?? []);
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const spin = (trackId: string = selectedTrack) => {
    setSpinning(true);
    setCopied(false);
    let ticks = 0;
    const interval = window.setInterval(() => {
      setIdea(generateIdea(trackId));
      ticks += 1;
      if (ticks > 8) {
        window.clearInterval(interval);
        setSpinning(false);
      }
    }, 70);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('project_ideas').insert({
      title: idea.title,
      description: idea.description,
      track: idea.track,
      stack: idea.stack,
    });
    setSaving(false);
    if (error) {
      setLoadError('Could not save this idea. Please try again.');
      return;
    }
    setLoadError(null);
    await loadSaved();
    setTab('saved');
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('project_ideas').delete().eq('id', id);
    if (error) {
      setLoadError('Could not delete this idea. Please try again.');
      return;
    }
    setLoadError(null);
    await loadSaved();
  };

  const handleCopy = () => {
    const text = `${idea.title}\n${idea.description}\nStack: ${idea.stack.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleSurprise = () => {
    const randomTrack = TRACKS[Math.floor(Math.random() * TRACKS.length)].id;
    setSelectedTrack(randomTrack);
    spin(randomTrack);
  };

  const heroStats = useMemo(
    () => [
      { label: 'Tracks', value: TRACKS.length },
      { label: 'Ideas', value: '∞' },
      { label: 'Weekend', value: '48h' },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white font-sans">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#ffd60a]/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-[#ff2d6f]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#3b82f6]/10 blur-3xl" />
      </div>

      <div className="relative">
        {/* Nav */}
        <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0b0b0f]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#ffd60a] text-black">
                <Rocket className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight">HackSparks</span>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
              <a href="#generator" className="transition hover:text-white">Generator</a>
              <a href="#tracks" className="transition hover:text-white">Tracks</a>
              <a href="#saved" className="transition hover:text-white">Saved</a>
            </nav>
            <a
              href="#generator"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffd60a]"
            >
              Start building
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-[#ffd60a]" />
            Your hackathon unfair advantage
          </div>
          <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Find a project idea
            <br />
            <span className="bg-gradient-to-r from-[#ffd60a] via-[#ff2d6f] to-[#3b82f6] bg-clip-text text-transparent">
              worth losing sleep over.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
            Pick a track, spin the generator, and walk into your next hackathon with a sharp, demo-ready idea and the stack to build it.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => spin()}
              className="group inline-flex items-center gap-2 rounded-full bg-[#ffd60a] px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:bg-[#ffe14d]"
            >
              <Zap className="h-4 w-4" />
              Generate an idea
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={handleSurprise}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Lightbulb className="h-4 w-4" />
              Surprise me
            </button>
          </div>
          <div className="mx-auto mt-14 flex max-w-md items-center justify-center gap-10">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <section id="generator" className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-8 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setTab('generate')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                tab === 'generate' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              Generator
            </button>
            <button
              onClick={() => setTab('saved')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                tab === 'saved' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              Saved ({saved.length})
            </button>
          </div>

          {loadError && (
            <div className="mx-auto mb-6 max-w-2xl rounded-xl border border-[#ff2d6f]/30 bg-[#ff2d6f]/10 px-4 py-3 text-sm text-[#ff8fb0]">
              {loadError}
            </div>
          )}

          {tab === 'generate' ? (
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
              {/* Track picker */}
              <div id="tracks" className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/40">
                  Choose your track
                </h3>
                <p className="mb-5 text-xs text-white/50">
                  Each track shapes the idea, name, and stack.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TRACKS.map((t) => {
                    const active = selectedTrack === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedTrack(t.id);
                          spin(t.id);
                        }}
                        className={`group rounded-2xl border p-3 text-left transition ${
                          active
                            ? 'border-[#ffd60a] bg-[#ffd60a]/10'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className="text-2xl">{t.emoji}</div>
                        <div className="mt-2 text-sm font-semibold text-white">{t.label}</div>
                        <div className="mt-0.5 text-[11px] leading-tight text-white/40">
                          {t.tagline}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Idea card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-8">
                <div className="absolute right-6 top-6 flex items-center gap-2">
                  <span className="rounded-full bg-[#ff2d6f]/15 px-3 py-1 text-xs font-semibold text-[#ff8fb0]">
                    {idea.track}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/40">
                  <Sparkles className="h-3.5 w-3.5 text-[#ffd60a]" />
                  Your generated idea
                </div>

                <h2
                  className={`mt-4 text-4xl font-extrabold tracking-tight transition ${
                    spinning ? 'blur-sm opacity-60' : 'opacity-100'
                  }`}
                >
                  {idea.title}
                </h2>
                <p
                  className={`mt-4 text-lg leading-relaxed text-white/70 transition ${
                    spinning ? 'blur-sm opacity-60' : 'opacity-100'
                  }`}
                >
                  {idea.description}
                </p>

                <div className="mt-6">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                    <Layers className="h-3.5 w-3.5" />
                    Suggested stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {idea.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80"
                      >
                        <Code2 className="h-3 w-3 text-[#3b82f6]" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-6 text-sm italic text-white/40">"{idea.tagline}"</p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => spin()}
                    disabled={spinning}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ffd60a] disabled:opacity-50"
                  >
                    <RefreshCw className={`h-4 w-4 ${spinning ? 'animate-spin' : ''}`} />
                    Regenerate
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || spinning}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? 'Saving...' : 'Save idea'}
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={spinning}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
                  >
                    {copied ? <Check className="h-4 w-4 text-[#ffd60a]" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div id="saved" className="pb-20">
              {saved.length === 0 ? (
                <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/5">
                    <Trophy className="h-7 w-7 text-white/40" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No saved ideas yet</h3>
                  <p className="mt-2 text-sm text-white/50">
                    Generate an idea you love and hit save — it will live here for the rest of the hackathon.
                  </p>
                  <button
                    onClick={() => setTab('generate')}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ffd60a] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#ffe14d]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Go to generator
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {saved.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-full bg-[#ff2d6f]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#ff8fb0]">
                          {item.track}
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-white/30 transition hover:text-[#ff2d6f]"
                          aria-label="Delete idea"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <h4 className="mt-3 text-lg font-bold">{item.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.description}</p>
                      {item.stack.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h3 className="text-center text-2xl font-bold">From idea to demo in three steps</h3>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Lightbulb className="h-6 w-6 text-[#ffd60a]" />,
                step: '01',
                title: 'Pick a track',
                body: 'Eight tracks from AI to social good. Each one tunes the generator to ideas judges actually want to see.',
              },
              {
                icon: <Zap className="h-6 w-6 text-[#ff2d6f]" />,
                step: '02',
                title: 'Spin the generator',
                body: 'Get a project name, a one-line pitch, and a suggested stack. Keep spinning until it clicks.',
              },
              {
                icon: <Rocket className="h-6 w-6 text-[#3b82f6]" />,
                step: '03',
                title: 'Save and ship',
                body: 'Save the ideas worth keeping. They stay in your pocket for the full 48 hours.',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/5">{s.icon}</div>
                  <span className="text-sm font-bold text-white/20">{s.step}</span>
                </div>
                <h4 className="mt-4 text-lg font-semibold">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-white/40 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#ffd60a] text-black">
                <Rocket className="h-4 w-4" />
              </div>
              <span className="font-semibold text-white/60">HackSparks</span>
              <span className="mx-2">·</span>
              <span>Built for hackers, by hackers.</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#generator" className="transition hover:text-white">Generator</a>
              <a href="#tracks" className="transition hover:text-white">Tracks</a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition hover:text-white"
              >
                <Github className="h-4 w-4" />
                Source
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
