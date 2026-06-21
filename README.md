<div align="center">

# 🏗️ System Design Visualizer

### AI-Powered System Design Analysis & Interactive Architecture Diagrams

[![MIT License](https://img.shields.io/badge/License-MIT-6366f1.svg?style=for-the-badge)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

**Enter any system design problem → Get a complete professional analysis + interactive architecture diagram, in seconds.**

[**🚀 Quick Start**](#quick-start) • [**📖 Features**](#features) • [**🏛️ Architecture**](#architecture) • [**📡 API Docs**](#api-documentation) • [**🗺️ Roadmap**](#roadmap)

---

</div>

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Powered Analysis** | Generates complete system design analysis for any problem |
| 🗺️ **Interactive Diagram** | Draggable, zoomable React Flow architecture diagram |
| 🏆 **Architecture Scoring** | Score your design across 5 dimensions with letter grade |
| 📄 **PDF Export** | Download a formatted PDF report |
| 📊 **Mermaid Export** | Export diagram as `.mmd` for Notion/GitHub/Confluence |
| 📝 **Design History** | Auto-saves all designs, load them anytime |
| 💬 **Interview Practice** | FAANG-style interview questions with hints & model answers |
| 🔀 **Multi-LLM Support** | Works with OpenAI GPT-4o and Anthropic Claude 3.5 Sonnet |
| 🐳 **Docker Ready** | One-command deployment with docker-compose |

## 🏛️ Architecture

```
┌─────────────┐     HTTPS      ┌──────────────────┐     API Call     ┌───────────────────┐
│   Browser   │ ─────────────► │  FastAPI Backend │ ──────────────► │  OpenAI / Claude  │
│  React + TS │ ◄───────────── │    Port 8000     │ ◄────────────── │   (Strict JSON)   │
│  Port 5173  │    JSON Data   └──────────────────┘   Structured     └───────────────────┘
└─────────────┘                        │                 Response
       │                               │
       ▼                               ▼
  React Flow                    history.json
  Diagram                       (Local Storage)
```

### How It Works

1. User enters a system design prompt (e.g., "Design Netflix")
2. Frontend sends `POST /api/generate` to FastAPI backend
3. Backend constructs a structured prompt forcing **strict JSON output**
4. LLM returns a complete JSON with requirements, components, nodes, and edges
5. Frontend renders analysis cards + React Flow diagram from the JSON
6. Design is auto-saved to history

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 20+
- An API key from [OpenAI](https://platform.openai.com) or [Anthropic](https://anthropic.com)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/system-design-visualizer.git
cd system-design-visualizer
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
ACTIVE_LLM_PROVIDER=openai      # or "anthropic"
OPENAI_API_KEY=sk-your-key-here
# ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 3a. Run with Docker (Recommended)

```bash
docker-compose up --build
```

Open `http://localhost:3000` 🎉

### 3b. Run Locally (Development)

**Backend:**
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend** (new terminal):
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` 🎉

## 📡 API Documentation

Once running, visit `http://localhost:8000/docs` for the interactive Swagger UI.

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/generate` | Generate system design analysis |
| `POST` | `/api/score` | Score an architecture (0-100) |
| `GET` | `/api/history` | List all saved designs |
| `GET` | `/api/history/{id}` | Get a specific design |
| `DELETE` | `/api/history/{id}` | Delete a design |
| `POST` | `/api/interview` | Generate interview questions |
| `POST` | `/api/export/pdf` | Export as PDF |
| `POST` | `/api/export/mermaid` | Export as Mermaid diagram |
| `GET` | `/api/health` | Health check |

### Request / Response Example

**Request:**
```json
POST /api/generate
{
  "query": "Design Netflix"
}
```

**Response:**
```json
{
  "title": "Netflix System Design",
  "query": "Design Netflix",
  "functional_requirements": ["Stream video content", "..."],
  "non_functional_requirements": ["99.99% uptime", "..."],
  "components": ["Video Streaming Service", "..."],
  "databases": ["Cassandra for user data", "..."],
  "caches": ["Redis for session management", "..."],
  "scalability_considerations": ["Horizontal scaling", "..."],
  "bottlenecks": ["Video transcoding pipeline", "..."],
  "interview_questions": ["How would you handle 1M concurrent users?", "..."],
  "nodes": [
    { "id": "client", "label": "Client App", "type": "client" }
  ],
  "edges": [
    { "source": "client", "target": "api_gateway", "label": "HTTPS" }
  ]
}
```

## ⚙️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ACTIVE_LLM_PROVIDER` | `openai` | LLM provider: `openai` or `anthropic` |
| `OPENAI_API_KEY` | — | Your OpenAI API key |
| `OPENAI_MODEL` | `gpt-4o` | OpenAI model to use |
| `ANTHROPIC_API_KEY` | — | Your Anthropic API key |
| `ANTHROPIC_MODEL` | `claude-3-5-sonnet-20241022` | Anthropic model to use |
| `HISTORY_FILE_PATH` | `./history_data/history.json` | Where to store design history |
| `CORS_ORIGINS` | `http://localhost:5173,...` | Allowed CORS origins |

## 📁 Project Structure

```
system-design-visualizer/
├── backend/
│   └── app/
│       ├── config/       # Settings (pydantic-settings)
│       ├── models/       # Error classes + handlers
│       ├── prompts/      # LLM prompt templates
│       ├── routers/      # FastAPI route handlers
│       ├── schemas/      # Pydantic request/response models
│       ├── services/     # Business logic (LLM, history, export)
│       └── main.py       # FastAPI app entry point
├── frontend/
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── hooks/        # Custom React hooks
│       ├── pages/        # Route-level pages
│       ├── services/     # API client
│       └── types/        # TypeScript interfaces
├── .github/              # Issue templates + contributing guide
├── .env.example          # Environment configuration template
├── docker-compose.yml    # Full stack Docker deployment
└── README.md
```

## 🎨 System Design Examples

The app works for **any** system design problem, including:

- 🎬 Design Netflix / YouTube
- 💬 Design WhatsApp / Slack / Discord
- 🚗 Design Uber / Lyft
- 📸 Design Instagram / TikTok
- 🛒 Design Amazon / Flipkart
- 🎵 Design Spotify
- 📁 Design Google Drive / Dropbox
- 💳 Design UPI / PayPal
- 🍔 Design Swiggy / Zomato
- 🔍 Design Google Search

## 🗺️ Roadmap

- [x] Core system design generation
- [x] React Flow interactive diagram
- [x] Architecture scoring
- [x] PDF export
- [x] Mermaid export
- [x] Design history
- [x] Interview practice mode
- [ ] Architecture comparison (side-by-side)
- [ ] Draw.io export
- [ ] Share design via URL
- [ ] Community design gallery
- [ ] Custom node themes

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](.github/CONTRIBUTING.md).

1. Fork the project
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feat/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**If this project helped you, please give it a ⭐ — it means a lot!**

Made with ❤️ for the engineering community

</div>
