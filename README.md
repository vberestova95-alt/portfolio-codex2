# Portfolio Next

Separate React + Vite copy of the original portfolio project for building a new site on a new domain and hosting without touching the current production site.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production output is generated in `dist/`.

## What was cleaned up in this copy

- removed the old `CNAME` domain binding
- excluded Git history, `docs/`, `dist/`, `node_modules/`, and test artifacts from the copied project
- kept the app structure and source code so the new site can evolve independently

## Recommended next steps

1. Initialize a new git repository in this folder.
2. Create a new remote repository for the new site.
3. Connect the new hosting provider to this separate repository.
4. Add the new domain in the hosting provider settings.
5. Update site content, visuals, SEO metadata, and analytics for the new brand/site.

## Notes

- `vercel.json` is still present. Keep it if the new hosting is Vercel, or replace/remove it if you deploy elsewhere.
- The app content still matches the current site and can now be changed safely in this separate copy.
