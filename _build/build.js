// ============================================================
// BUILD.JS — Generates all HTML pages for ChangingUnits
//
// Usage:
//   node build.js                        — build everything
//   node build.js length                 — rebuild length only
//   node build.js length cm-to-inches    — rebuild one page
//   node build.js currency               — rebuild all currency pages
//
// OUTPUT: files are written directly to OUT folder.
// Running again overwrites existing files — no delete needed.
// ============================================================

const fs   = require('fs');
const path = require('path');
const { SITE, CATEGORIES } = require('./data');
const { converterPageTemplate, categoryHubTemplate,
        currencyConverterTemplate, currencyHubTemplate } = require('./templates');

// ── OUTPUT FOLDER ─────────────────────────────────────────────
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
  if (cat.isCurrency) {
    write(path.join(OUT, cat.id, 'index.html'), currencyHubTemplate(cat.currencies, CATEGORIES));
  } else {
    write(path.join(OUT, cat.id, 'index.html'), categoryHubTemplate(cat, CATEGORIES));
  }
}

function buildConverter(cat, conv) {
  if (cat.isCurrency) {
    const html = currencyConverterTemplate(
      conv.from, conv.to, conv.fromName, conv.toName, cat.currencies
    );
    write(path.join(OUT, cat.id, conv.slug, 'index.html'), html);
  } else {
    write(path.join(OUT, cat.id, conv.slug, 'index.html'), converterPageTemplate(cat, conv));
  }
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    `  <url><loc>${SITE.domain}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`
  ];
  CATEGORIES.forEach(cat => {
    urls.push(`  <url><loc>${SITE.domain}/${cat.id}/</loc><lastmod>${today}</lastmod><changefreq>${cat.isCurrency ? 'daily' : 'monthly'}</changefreq><priority>0.8</priority></url>`);
    cat.converters.forEach(conv => {
      const p = conv.popular ? '0.9' : '0.7';
      const freq = cat.isCurrency ? 'daily' : 'monthly';
      urls.push(`  <url><loc>${SITE.domain}/${cat.id}/${conv.slug}/</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${p}</priority></url>`);
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
