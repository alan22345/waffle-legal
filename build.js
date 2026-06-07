// Static-site generator for the Waffle legal pages.
// Converts privacy.md / terms.md into styled, self-contained HTML.
// No dependencies, no Jekyll (a .nojekyll file disables GitHub's build step).
// Re-run after editing the markdown:  node build.js
const fs = require("fs");
const path = require("path");

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Inline: escape, then bold then links.
function inline(text) {
  let t = esc(text);
  t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return t;
}

function cells(line) {
  return line
    .replace(/^\|/, "")
    .replace(/\|\s*$/, "")
    .split("|")
    .map((c) => c.trim());
}

function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (/^#{1,6}\s/.test(line)) {
      const level = line.match(/^#+/)[0].length;
      out.push(`<h${level}>${inline(line.replace(/^#+\s/, ""))}</h${level}>`);
      i++;
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    // Table: a header row of pipes followed by a |---|---| separator.
    if (line.trim().startsWith("|") && /^\s*\|[-\s|:]+\|\s*$/.test(lines[i + 1] || "")) {
      const header = cells(line);
      i += 2; // skip header + separator
      const body = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        body.push(cells(lines[i]));
        i++;
      }
      const thead = `<thead><tr>${header.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>`;
      const tbody = `<tbody>${body
        .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
        .join("")}</tbody>`;
      out.push(`<table>${thead}${tbody}</table>`);
      continue;
    }

    // Unordered list.
    if (/^\s*-\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*-\s/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*-\s/, ""))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    // Paragraph: gather consecutive plain lines.
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !/^\s*-\s/.test(lines[i]) &&
      !lines[i].trim().startsWith("|")
    ) {
      para.push(lines[i].trim());
      i++;
    }
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  return out.join("\n");
}

const STYLE = `
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 17px/1.65 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1c1c1e; background: #fff; }
  main { max-width: 720px; margin: 0 auto; padding: 48px 24px 96px; }
  h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 .25em; }
  h2 { font-size: 1.25rem; margin: 2em 0 .5em; }
  p { margin: 0 0 1em; }
  ul { margin: 0 0 1em; padding-left: 1.3em; }
  li { margin: .25em 0; }
  a { color: #b8742a; }
  strong { font-weight: 650; }
  table { width: 100%; border-collapse: collapse; margin: 0 0 1.5em; font-size: .95rem; }
  th, td { text-align: left; padding: 8px 10px; border: 1px solid #e2e2e6; vertical-align: top; }
  th { background: #faf6f0; }
  footer { max-width: 720px; margin: 0 auto; padding: 0 24px 48px; font-size: .9rem; color: #8a8a8e; }
  footer a { color: #8a8a8e; }
  @media (prefers-color-scheme: dark) {
    body { color: #e6e6ea; background: #111; }
    th { background: #1c1714; }
    th, td { border-color: #2c2c30; }
  }
`;

function page(title, bodyHtml, withNav) {
  const nav = withNav
    ? `<footer><a href="../privacy/">Privacy Policy</a> &middot; <a href="../terms/">Terms of Service</a> &middot; <a href="../support/">Support</a></footer>`
    : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — Waffle</title>
<style>${STYLE}</style>
</head>
<body>
<main>
${bodyHtml}
</main>
${nav}
</body>
</html>
`;
}

function writePage(dir, title, mdFile) {
  const md = fs.readFileSync(path.join(__dirname, mdFile), "utf8");
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
  fs.writeFileSync(path.join(__dirname, dir, "index.html"), page(title, mdToHtml(md), true));
  console.log(`wrote ${dir}/index.html`);
}

writePage("privacy", "Privacy Policy", "privacy.md");
writePage("terms", "Terms of Service", "terms.md");
writePage("support", "Support", "support.md");

// Landing page.
const indexBody = `<h1>Waffle</h1>
<p>Legal documents and support for the Waffle mobile app.</p>
<ul>
<li><a href="privacy/">Privacy Policy</a></li>
<li><a href="terms/">Terms of Service</a></li>
<li><a href="support/">Support</a></li>
</ul>
<p>Questions: <a href="mailto:wafflingwafflerswaffle@gmail.com">wafflingwafflerswaffle@gmail.com</a></p>`;
fs.writeFileSync(path.join(__dirname, "index.html"), page("Legal", indexBody, false));
console.log("wrote index.html");
