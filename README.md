# Ebuka Labs

A static portfolio site. No build step, no dependencies, no server. It runs as plain files on GitHub Pages.

## What is in here

| Path | What it does |
| --- | --- |
| `index.html` | The home page |
| `privacy.html`, `404.html` | Privacy page and the "not found" page |
| `css/style.css` | All styling |
| `js/config.js` | **The only file you normally edit.** Email, social links, photo and products |
| `js/main.js`, `js/privacy.js` | Page logic. Leave alone unless you know why |
| `fonts/` | Self-hosted fonts (Space Grotesk, DM Sans, DM Mono, SIL Open Font License 1.1) |
| `media/` | Your screenshots, GIFs and videos go here |
| `scripts/check.py` | Integrity and security checker. Also runs automatically on every push |

## Edit the site

Open `js/config.js`. It has four numbered settings: email, social links, about photo, products.

**Add a product image or video**
1. Put the file in `media/`, for example `media/notes.mp4` or `media/notes.png`.
2. In `config.js`, set that product's `media:'media/notes.mp4'`.
3. MP4 and WebM play on a muted loop. Images and GIFs fill the glass card. Phone recordings work best in portrait.

**Add a product's landing page**: set its `url:'https://...'`. Empty means the button goes back to the home page.

Keep files small so the site loads fast: videos under about 5 MB, images under about 500 KB.

## Put it online (GitHub Pages)

1. Create a repo named `yourusername.github.io` (or any name, then the site lives at `yourusername.github.io/name`).
2. Upload everything in this folder, including the hidden `.github` folder.
3. Repo Settings, then Pages: deploy from the `main` branch, root folder.
4. Tick **Enforce HTTPS**.

**When you buy the domain:** Settings, Pages, Custom domain, type it in. Then add the DNS records GitHub lists in its docs at your registrar. GitHub creates a `CNAME` file for you. Do not buy separate hosting.

## Checks

```
python scripts/check.py
```

Run it before every upload. It checks for broken links and missing files, duplicate ids, unsafe code patterns, leaked secrets, missing alt text and the security policy. Errors fail the run. Warnings are reminders, such as a placeholder email.

Preview locally with `python -m http.server` and open http://localhost:8000. Do not double-click `index.html`, because the security policy only works properly over http.

## Security notes

- A strict Content Security Policy is set in every page: scripts, fonts, images and media load only from this site. Nothing is sent anywhere (`connect-src 'none'`).
- No cookies, no analytics, no storage, no third-party requests.
- All product text is escaped before it is placed in the page, and `javascript:` style links are refused.
- External links use `rel="noopener noreferrer"`.
- If you later embed YouTube or similar, you must loosen the policy on purpose (`frame-src` / `media-src`). Do not do it casually.
- GitHub Pages cannot set HTTP headers, so clickjacking protection (frame-ancestors) is not possible here. For a portfolio this is low risk.
- Protect the repo itself: turn on two-factor sign-in for your GitHub account, and never commit passwords, keys or personal documents.
