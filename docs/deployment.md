# Deployment Guide

This project is a React SPA (single-page application) deployed with Nginx. Because client-side routing handles all internal navigation, **a standard static file server setup will break routing for all routes except `/`**.

This guide covers the production deployment process, the Nginx configuration, and common pitfalls.

---

## Why standard static hosting fails for SPAs

With a static SPA, the server only serves `index.html` directly. If a user navigates to `/login` directly (e.g. via a bookmark, refresh, or direct URL), the server tries to find a file at `/login` — which doesn't exist — and returns a 404.

The solution is **SPA fallback routing**: the server must return `index.html` for every route that doesn't match a static asset, letting React Router handle the routing on the client.

---

## Docker deployment

```bash
# Build the Docker image
docker build -t codice-alado .

# Run the container
docker run -p 8080:80 codice-alado
```

The app will be available at `http://localhost:8080`.

### What's in the Dockerfile

The project uses a **multi-stage Docker build**:

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build   # runs tsc -b && vite build

# Stage 2: Serve
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- **Stage 1** installs dependencies and runs the full build (including TypeScript type-checking).
- **Stage 2** copies the production build output (`dist/`) into an Nginx container, replacing the default config with the project's custom `nginx.conf`.

---

## Nginx configuration

`nginx.conf` in the project root is the key to making client-side routing work in production.

### Key directives

```nginx
# Serve static assets with long-lived cache headers
location ~* \.(js|css|png|svg|jpg|jpeg|gif|ico|woff2?|ttf|mp4)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
}

# SPA fallback — all unmatched routes return index.html
location / {
    try_files $uri $uri/ /index.html;
}
```

### How SPA fallback works

`try_files $uri $uri/ /index.html` checks in order:

1. **`$uri`** — Does the requested path match a real file? (e.g. `/assets/index.js`) → serve it.
2. **`$uri/`** — Does it match a directory? → serve the index of that directory.
3. **`/index.html`** (fallback) — Return the SPA entry point. React Router then reads the URL and renders the correct route.

This means **any URL** — `/login`, `/admin/settings`, `/anything/at/all` — will correctly load the app, which then handles the route.

### Caching static assets

Assets matching the first `location` block get `expires 1y` and `Cache-Control: public, immutable`, meaning browsers cache them for one year. The filename includes a content hash (Vite's default), so cache busting is automatic on deploy.

---

## Manual Nginx deployment (without Docker)

If deploying without Docker, install Nginx and copy the build output:

```bash
# 1. Build the project
npm run build

# 2. Copy the dist/ output to Nginx's web root
cp -r dist/* /usr/share/nginx/html/

# 3. Replace the default Nginx config
cp nginx.conf /etc/nginx/conf.d/default.conf

# 4. Reload Nginx
nginx -s reload
```

Or use the config snippet above directly in your server's `server {}` block.

---

## Vercel / Netlify / Cloudflare Pages

These platforms handle SPA fallback automatically for React projects — no config changes needed. Just make sure your framework adapter (Vite in this case) outputs to the default static output directory (`dist/`).

If you encounter 404s on direct route navigation:

- **Vercel**: Add `vercel.json` with `rewrites` pointing all routes to `index.html`.
- **Netlify**: Ensure `_redirects` file with `/* /index.html 200` exists in the output directory.
- **Cloudflare Pages**: SPA mode is enabled by default for frameworks that use client-side routing.

---

## Environment variables

Environment variables for production must be set at **build time** (Vite bakes them into the bundle). There is no runtime env variable support in Vite by default.

```bash
# Build with env vars
VITE_API_URL=https://api.example.com npm run build
```

Variables must be prefixed with `VITE_` to be accessible in client-side code. For secrets that must not be exposed in the client bundle, use a server-side proxy instead.

---

## Deploy checklist

- [ ] Run `npm run build` locally — it must pass `tsc -b` with no type errors
- [ ] All routes (including non-root) are accessible via direct URL refresh or bookmark
- [ ] Static assets have long cache headers and content hashes in filenames
- [ ] `nginx.conf` is deployed with SPA fallback configured
- [ ] No secrets or private keys are baked into the client bundle (use server-side env vars or proxy)
- [ ] `Dockerfile` is tested: `docker build` succeeds and the container starts correctly