// ============================================================
// BUILD.JS — Generates all HTML pages for ChangingUnits
//
// Usage:
//   node build.js                        — build everything
//   node build.js length                 — rebuild length only
//   node build.js length cm-to-inches    — rebuild one page
//
// OUTPUT: files are written directly to OUT folder.
// Running again overwrites existing files — no delete needed.
// ============================================================

const fs   = require('fs');
const path = require('path');
const { SITE, CATEGORIES } = require('./data');
const { converterPageTemplate, categoryHubTemplate } = require('./templates');

// ── OUTPUT FOLDER ─────────────────────────────────────────────
// Writes to the parent of _build/ — your site root
// No need to change this — works on any machine automatically
const OUT = path.join(__dirname, '../');

// ── HELPERS ───────────────────────────────────────────────────
function mkdir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function write(filePath, content) {
  mkdir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('  ✓ ' + filePath.replace(OUT, ''));
}

// ── BUILD FUNCTIONS ───────────────────────────────────────────
function buildHub(cat) {
  write(path.join(OUT, cat.id, 'index.html'), categoryHubTemplate(cat, CATEGORIES));
}

function buildConverter(cat, conv) {
  write(path.join(OUT, cat.id, conv.slug, 'index.html'), converterPageTemplate(cat, conv));
}

function buildSitemap() {
  const urls = [
    `  <url><loc>${SITE.domain}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`
  ];
  CATEGORIES.forEach(cat => {
    urls.push(`  <url><loc>${SITE.domain}/${cat.id}/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
    cat.converters.forEach(conv => {
      const p = conv.popular ? '0.9' : '0.7';
      urls.push(`  <url><loc>${SITE.domain}/${cat.id}/${conv.slug}/</loc><changefreq>monthly</changefreq><priority>${p}</priority></url>`);
    });
  });
  write(
    path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`
  );
}

// ── MAIN ──────────────────────────────────────────────────────
const [,, filterCat, filterSlug] = process.argv;
const t0 = Date.now();

console.log('\n🔨 ChangingUnits build');
console.log('   Output:', OUT, '\n');
mkdir(OUT);

let n = 0;

CATEGORIES.forEach(cat => {
  if (filterCat && cat.id !== filterCat) return;
  console.log(`📁 ${cat.name} (/${cat.id}/)`);
  if (!filterSlug) { buildHub(cat); n++; }
  cat.converters.forEach(conv => {
    if (filterSlug && conv.slug !== filterSlug) return;
    buildConverter(cat, conv);
    n++;
  });
});

if (!filterCat) {
  buildSitemap();
  console.log('\n📋 sitemap.xml updated');
}

console.log(`\n✅ ${n} page${n !== 1 ? 's' : ''} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log('   Files written in-place — no manual copy needed.\n');
