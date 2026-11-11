#!/usr/bin/env python3
"""Integrity and security checks for the Ebuka Labs site. Standard library only.
Run from the repo root:  python scripts/check.py
Exit code 1 means a real problem. Warnings are reminders and do not fail the run."""
import re, sys, pathlib
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parent.parent
errors, warns = [], []
err, warn = errors.append, warns.append

REQUIRED = ["index.html", "privacy.html", "404.html", "css/style.css", "js/config.js",
            "js/main.js", "js/privacy.js", "favicon.svg", "robots.txt", ".nojekyll"]
for f in REQUIRED:
    if not (ROOT / f).exists():
        err(f"missing file: {f}")

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

def is_local(ref):
    return bool(ref) and not re.match(r"^(https?:|mailto:|tel:|#|data:)", ref)

for name in ["index.html", "privacy.html", "404.html"]:
    path = ROOT / name
    if not path.exists():
        continue
    raw = path.read_text(encoding="utf-8")
    p = Page(); p.feed(raw)
    ids = [a["id"] for t, a in p.tags if "id" in a]
    for i in set(ids):
        if ids.count(i) > 1:
            err(f"{name}: duplicate id '{i}'")
    if not any(t == "html" and a.get("lang") for t, a in p.tags):
        err(f"{name}: <html> needs a lang attribute")
    if "Content-Security-Policy" not in raw:
        err(f"{name}: Content-Security-Policy meta tag is missing")
    if re.search(r"\son[a-z]+\s*=", raw):
        err(f"{name}: inline event handler found (breaks the security policy)")
    if "http://" in raw:
        err(f"{name}: insecure http:// reference")
    for t, a in p.tags:
        if t == "a" and "href" in a:
            h = a["href"]
            if h == "#" and "data-l" not in a:
                err(f"{name}: dead link href=\"#\"")
            elif h.startswith("#") and len(h) > 1 and h[1:] not in ids:
                err(f"{name}: link to missing section {h}")
            elif is_local(h) and not (ROOT / h.split("#")[0]).exists():
                err(f"{name}: broken link {h}")
            if a.get("target") == "_blank" and "noopener" not in a.get("rel", ""):
                err(f"{name}: target=_blank without rel=noopener")
        if t == "script":
            s = a.get("src", "")
            if s and not is_local(s):
                err(f"{name}: external script {s}")
            elif s and not (ROOT / s).exists():
                err(f"{name}: missing script {s}")
        if t == "link" and is_local(a.get("href", "")) and not (ROOT / a["href"]).exists():
            err(f"{name}: missing file {a['href']}")
        if t == "img" and "alt" not in a:
            err(f"{name}: <img> without alt text")

FORBIDDEN = [r"\beval\s*\(", r"document\.write", r"new Function", r"javascript:", r"\.outerHTML\s*="]
for f in ["js/config.js", "js/main.js", "js/privacy.js"]:
    path = ROOT / f
    if not path.exists():
        continue
    code = path.read_text(encoding="utf-8")
    for pat in FORBIDDEN:
        if re.search(pat, code):
            err(f"{f}: forbidden pattern {pat}")
    if "http://" in code:
        err(f"{f}: insecure http:// reference")
    if "_blank" in code and "noopener" not in code:
        err(f"{f}: target=_blank without noopener")
    for ref in re.findall(r"(?:media|url):'([^']+)'", code):
        if is_local(ref) and not (ROOT / ref).exists():
            err(f"{f}: file not found: {ref}")

css = (ROOT / "css/style.css").read_text(encoding="utf-8") if (ROOT / "css/style.css").exists() else ""
for ref in re.findall(r"url\(([^)]+)\)", css):
    ref = ref.strip("'\" ")
    if is_local(ref) and not (ROOT / "css" / ref).resolve().exists():
        err(f"css/style.css: missing file {ref}")
if "@import" in css or re.search(r"url\(['\"]?https?:", css):
    err("css/style.css: loads something from another site")

SECRETS = [r"AKIA[0-9A-Z]{16}", r"-----BEGIN [A-Z ]*PRIVATE KEY-----", r"gh[pousr]_[A-Za-z0-9]{36,}",
           r"(?i)(api[_-]?key|secret|passw(or)?d|token)\s*[:=]\s*['\"][^'\"]{8,}"]
for path in ROOT.rglob("*"):
    if path.is_file() and path.suffix in {".html", ".js", ".css", ".md", ".yml", ".txt", ".svg"} and ".git/" not in str(path):
        text = path.read_text(encoding="utf-8", errors="ignore")
        for pat in SECRETS:
            if re.search(pat, text):
                err(f"{path.relative_to(ROOT)}: possible secret matches {pat}")

cfg = (ROOT / "js/config.js").read_text(encoding="utf-8") if (ROOT / "js/config.js").exists() else ""
if "hello@ebukalabs.com" in cfg:
    warn("config.js: EMAIL is still the placeholder. Messages would go to an address you may not own.")
if re.search(r"LINKS=\{[^}]*''", cfg):
    warn("config.js: some social links are still empty")
if re.search(r"url:''", cfg):
    warn("config.js: some products have no landing page url yet (they link to home)")

print("Checked", len(REQUIRED), "required files and 3 pages.")
for w in warns: print("WARN ", w)
for e in errors: print("ERROR", e)
print(f"{len(errors)} error(s), {len(warns)} warning(s)")
sys.exit(1 if errors else 0)
