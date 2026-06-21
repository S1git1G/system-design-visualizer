# Contributing to System Design Visualizer

Thank you for wanting to contribute! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/system-design-visualizer`
3. Create a branch: `git checkout -b feat/your-feature-name`
4. Make your changes
5. Commit with [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m "feat: add comparison mode"`
6. Push: `git push origin feat/your-feature-name`
7. Open a Pull Request

## Commit Convention

| Type | When to use |
|------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Formatting, missing semicolons, etc. |
| `refactor:` | Code change that neither fixes a bug nor adds a feature |
| `test:` | Adding tests |
| `chore:` | Build process or auxiliary tool changes |

## Development Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example ../.env
# Add your API key to .env
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Questions?

Open an issue or start a discussion. We're happy to help!
