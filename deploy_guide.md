# 🚀 Render.com Free Deployment Guide

Follow these steps to host your **System Design Visualizer** live on the internet using Render's free tier. We will deploy the **Backend** as a Docker Web Service and the **Frontend** as a Static Site (which never goes to sleep!).

---

## Part 1: Deploy the Backend (Docker Web Service)

1. Sign up/Log in to [Render.com](https://render.com) using your **GitHub account**.
2. Click the **New +** button in the top right and select **Web Service**.
3. Connect your `system-design-visualizer` repository.
4. Set the following configuration options:
   * **Name**: `system-design-visualizer-backend`
   * **Region**: Choose the one closest to you (e.g., Oregon or Singapore).
   * **Branch**: `main`
   * **Root Directory**: `backend` (⚠️ *Very Important: This tells Render to execute inside the backend folder*)
   * **Runtime**: `Docker` (⚠️ *Very Important: Render will automatically find and use `backend/Dockerfile`*)
   * **Instance Type**: `Free`
5. Scroll down and click **Advanced** → **Add Environment Variable**. Add the following variables:
   * `ACTIVE_LLM_PROVIDER` = `openrouter`
   * `OPENROUTER_API_KEY` = `your-openrouter-api-key-here`
   * `OPENROUTER_MODEL` = `openrouter/free`
   * `CORS_ORIGINS` = `*` (Allows your frontend to connect safely)
6. Click **Create Web Service**.
7. Render will now build and boot your backend. Once complete, copy the backend URL displayed at the top (e.g., `https://system-design-visualizer-backend.onrender.com`).

---

## Part 2: Deploy the Frontend (Static Site — 100% Free, Stays Awake)

Since the frontend builds into standard HTML/JS/CSS assets, we can deploy it as a **Static Site** on Render. This is completely free and **never goes to sleep**.

1. In your Render Dashboard, click **New +** → **Static Site**.
2. Select your `system-design-visualizer` repository.
3. Set the following configuration options:
   * **Name**: `system-design-visualizer`
   * **Branch**: `main`
   * **Root Directory**: `frontend` (⚠️ *Very Important: Tells Render to build in the frontend folder*)
   * **Build Command**: `npm run build`
   * **Publish Directory**: `dist` (⚠️ *Very Important: Tells Render to serve Vite's build output*)
4. Scroll down and click **Advanced** → **Add Environment Variable**. Add:
   * `VITE_API_BASE_URL` = `https://your-backend-url-from-part-1.onrender.com` (Paste the exact URL you copied in Part 1)
5. Click **Create Static Site**.
6. Render will build your React code, injecting your backend URL at build time.

Once built, Render will give you a frontend URL (e.g., `https://system-design-visualizer.onrender.com`). Open it in your browser and your System Design Visualizer will be fully live and connected!
