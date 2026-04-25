FROM python:3.11-slim

WORKDIR /app

# Install UV package manager
RUN pip install --no-cache-dir uv

# Copy project files
COPY pyproject.toml .
COPY app/ ./app/

# Install dependencies using UV
RUN uv pip install --system --no-cache -r pyproject.toml

# Hugging Face Spaces requires port 7860
EXPOSE 7860

# Start FastAPI with uvicorn on port 7860
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
