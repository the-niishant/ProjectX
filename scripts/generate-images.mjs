import fs from 'fs';
import path from 'path';

const OUTDIR = path.join(process.cwd(), 'public/images');
if (!fs.existsSync(OUTDIR)) fs.mkdirSync(OUTDIR, { recursive: true });

const placeholders = {
  hero: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#09151f"/><circle cx="200" cy="200" r="60" fill="#e0ad62" opacity="0.6"/></svg>`),
  detail: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#102735"/><path d="M0,0 L400,0 L400,400 L0,400 Z" fill="none" stroke="#e0ad62" stroke-width="3"/></svg>`),
  collection: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#182c48"/><line x1="0" y1="0" x2="400" y2="400" stroke="#e0ad62" stroke-width="4" opacity="0.5"/><line x1="400" y1="0" x2="0" y2="400" stroke="#e0ad62" stroke-width="4" opacity="0.5"/></svg>`),
};

fs.writeFileSync(path.join(OUTDIR, 'placeholders.json'), JSON.stringify(placeholders, null, 2));
console.log('Generated placeholders');
