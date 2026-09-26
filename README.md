# Eclipse — company website

Next.js 16 (App Router) + Three.js. Single landing page.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Structure

- `app/globals.css` — design tokens (orange / white / black / cream) and all styles
- `components/EclipseScene.tsx` — WebGL eclipse hero (corona shader, rim-lit moon, dust); follows the cursor and scroll
- `components/widgets/*` — live demos in the services cards: block explorer, AI agent, CRM pipeline, deploy terminal
- `components/*` — one file per page section

## Before launch

- Replace the placeholder stats, portfolio projects and open roles with real ones
- `components/BookCall.tsx` only shows a success state; wire `onSubmit` to your backend, form service or calendar
- Update `hello@eclipse.studio` / `careers@eclipse.studio` and footer social links
