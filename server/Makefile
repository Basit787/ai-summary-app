sync:
	uv sync
start:
	uv run uvicorn main:app --host 0.0.0.0 --port 2000 --app-dir src
dev:
	docker compose up -d && uv run uvicorn main:app --host 0.0.0.0 --port 2000 --reload --app-dir src
lint:
	uv run ruff check
fix:
	uv run ruff check --fix
format:
	uv run ruff format