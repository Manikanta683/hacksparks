# ⚡ HackSparks

> A hackathon idea generator that helps you move from a blank page to a demo-ready project concept in seconds.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)

## 🚀 What is HackSparks?

HackSparks is a web app designed for hackathon teams that need a strong starting point quickly. Choose a project track, generate an idea, regenerate until you find a direction worth building, and save ideas for later.

The current generator supports **8 tracks**:

- 🤖 AI / ML
- ⛓️ Web3
- 🌱 Climate
- 🩺 Health
- 📚 Education
- 💳 Fintech
- 🛠️ Developer Tools
- 🤝 Social Good

Each generated idea includes a project name, concept, suggested technology stack, and hackathon-focused tagline.

## ✨ Features

- **Track-based idea generation** — generate ideas around a specific domain.
- **Surprise Me** — randomly choose a track and generate an idea.
- **Regenerate** — quickly explore alternative concepts.
- **Save ideas** — persist promising ideas in Supabase.
- **Saved ideas view** — review and delete previously saved concepts.
- **Copy to clipboard** — copy the generated idea and stack for easy sharing.
- **Responsive UI** — dark, modern interface built for desktop and mobile layouts.

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Database | Supabase |
| Data client | Supabase JavaScript SDK |
| Quality checks | ESLint + TypeScript |

## 📁 Project Structure

```text
hacksparks/
├── src/
│   ├── lib/
│   │   ├── generator.ts     # Tracks, idea templates, names and stacks
│   │   └── supabase.ts      # Supabase client and data types
│   ├── App.tsx              # Main application UI and interactions
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Manikanta683/hacksparks.git
cd hacksparks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

The app reads these Vite environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create a `.env` file locally and add the values from your Supabase project settings.

The application expects a `project_ideas` table containing at least:

- `id`
- `title`
- `description`
- `track`
- `stack`
- `created_at`

Do not commit private service-role keys or other secrets to the repository.

### 4. Start the development server

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

## 🏗️ Build for Production

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

Useful checks:

```bash
npm run lint
npm run typecheck
```

## 🧠 How the Generator Works

The current generator is intentionally lightweight and does not require an external AI API for its core functionality.

For each track, HackSparks maintains:

1. Idea components — a subject, action, and problem/detail.
2. Project names.
3. A recommended technology stack.
4. Hackathon-oriented taglines.

When an idea is generated, the app selects compatible pieces for the chosen track and assembles them into a project concept. This keeps generation fast and avoids an API dependency for the core experience.

## 💾 Saved Ideas

Generated ideas can be stored in Supabase. The frontend reads, inserts, and deletes records from the `project_ideas` table through the Supabase client.

For production, configure appropriate Supabase Row Level Security policies and authentication rather than leaving database access unrestricted.

## 🌐 Deployment

HackSparks can be deployed to Vite-compatible hosting platforms such as Vercel, Netlify, or Cloudflare Pages.

For deployment, configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in the hosting provider.

## 🔮 Future Improvements

- User authentication and per-user saved ideas
- Custom user-defined project constraints
- Detailed project blueprints and MVP plans
- Idea scoring based on feasibility, novelty, and impact
- Team collaboration and sharing
- Export to Markdown/PDF
- Optional external recommendation or LLM integrations

## 🤝 Contributing

Contributions are welcome. Fork the repository, create a feature branch, make your changes, and open a pull request with a clear description of what changed.

## 📄 License

No license is currently specified for this repository. If you intend to accept external contributions or allow reuse, add an explicit open-source license.

---

**HackSparks** — pick a direction, spark an idea, start building. ⚡
