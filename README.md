# waffle-legal

Public hosting for the Waffle app's legal pages (required for App Store submission).

Served via GitHub Pages:

- Privacy Policy — https://alan22345.github.io/waffle-legal/privacy/
- Terms of Service — https://alan22345.github.io/waffle-legal/terms/

## Editing

Edit `privacy.md` / `terms.md`, then regenerate the HTML:

```bash
node build.js
git commit -am "update legal text" && git push
```

`build.js` is a dependency-free markdown→HTML generator. `.nojekyll` disables
GitHub's Jekyll build so the committed HTML is served as-is.
