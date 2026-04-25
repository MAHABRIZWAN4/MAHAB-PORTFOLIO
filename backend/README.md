# Mahab Rizwan Portfolio - Backend API

FastAPI backend for AI-powered portfolio website.

## Tech Stack

- **Framework**: FastAPI
- **AI**: OpenRouter API (google/gemma-4-31b-it:free)
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: UV
- **Testing**: Pytest
- **Deployment**: Hugging Face Spaces (Docker)

## Local Development

### 1. Setup Environment

```bash
cd backend

# Create virtual environment with UV
uv venv

# Install dependencies
uv sync

# Copy environment template
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` with your actual keys:

```env
# Get from openrouter.ai
OPENROUTER_API_KEY=sk-or-v1-...

# Get from supabase.com → project → settings → API
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGc...

# Local development
ALLOWED_ORIGINS=http://localhost:3000
```

### 3. Run Development Server

```bash
uv run uvicorn app.main:app --reload --port 8000
```

API will be available at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Testing

### Run All Tests

```bash
cd backend
uv run pytest tests/test_main.py -v
```

### Expected Output

```
tests/test_main.py::test_root_endpoint PASSED
tests/test_main.py::test_health_check PASSED
tests/test_main.py::test_ping_endpoint PASSED
tests/test_main.py::test_invalid_route_returns_404 PASSED
tests/test_main.py::test_cors_header_present PASSED
tests/test_main.py::test_health_returns_api_name PASSED

====== 6 passed in X.XXs ======
```

### Run with Coverage

```bash
uv run pytest tests/ --cov=app --cov-report=html
```

## API Endpoints

### Core Endpoints

- `GET /` - API information
- `GET /health` - Health check for monitoring
- `GET /ping` - Uptime check (for UptimeRobot)

### Documentation

- `GET /docs` - Swagger UI
- `GET /redoc` - ReDoc documentation

## Deployment

### Hugging Face Spaces

1. Create new Space on Hugging Face
2. Select Docker as SDK
3. Push code to Space repository
4. Add environment variables in Space settings
5. Space will auto-deploy on port 7860

### Environment Variables (Production)

Set these in HF Spaces settings:

```
OPENROUTER_API_KEY=sk-or-v1-...
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGc...
ALLOWED_ORIGINS=https://your-portfolio.vercel.app
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py          # Package marker
│   ├── main.py              # FastAPI app + endpoints
│   └── config.py            # Settings management
├── tests/
│   ├── __init__.py          # Test package marker
│   └── test_main.py         # Test suite
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── Dockerfile               # HF Spaces deployment
├── pyproject.toml           # UV dependencies
└── README.md                # This file
```

## Development Notes

- Uses UV for fast dependency management
- Rate limiting configured with slowapi
- CORS enabled for frontend integration
- All tests are independent (fixtures reset state)
- OpenRouter provides free AI model access
- Supabase handles database operations

## Author

**Mahab Rizwan**  
AI-Powered Full Stack Developer  
Karachi, Pakistan

- Email: mahabrizwan@gmail.com
- GitHub: [@MAHABRIZWAN4](https://github.com/MAHABRIZWAN4)
- LinkedIn: [mahab-rizwan](https://linkedin.com/in/mahab-rizwan-831095341)
