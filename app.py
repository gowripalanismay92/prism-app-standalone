import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Prism App Standalone")

# Safely mount static directories only if they exist
if os.path.exists("dist"):
    if os.path.exists("dist/assets"):
        app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")
    app.mount("/static", StaticFiles(directory="dist"), name="static")


@app.get("/api/user")
async def get_current_user(request: Request):
    user_email = request.headers.get("x-databricks-user-name", "gowripalanisamy92@gmail.com")
    user_name = request.headers.get("x-databricks-user-display-name", user_email.split("@")[0].title())

    return JSONResponse({
        "username": user_name,
        "email": user_email,
        "authenticated": True
    })


@app.get("/{full_path:path}")
async def serve_react(request: Request, full_path: str):
    # Check if a specific file exists in dist (e.g., JS chunks, CSS, favicon)
    file_path = os.path.join("dist", full_path)
    if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)

    # Otherwise fallback to index.html for React SPA routing
    if os.path.exists("dist/index.html"):
        with open("dist/index.html", "r") as f:
            return HTMLResponse(content=f.read())
    return HTMLResponse(content="<h1>Prism App Building... Please refresh in a moment.</h1>")


if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("DATABRICKS_APP_PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)