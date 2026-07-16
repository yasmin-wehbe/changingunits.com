// ============================================================
// BUILD.JS — Generates all HTML pages for ChangingUnits
// Usage:
//   node build.js              — build everything
//   node build.js length       — rebuild length only
//   node build.js glossary     — rebuild glossary only
//   node build.js length cm-to-inches — rebuild one page
// ============================================================

const fs   = require('fs');
const path = require('path');
const { SITE, CATEGORIES } = require('./data');
const {
  converterPageTemplate, categoryHubTemplate,
  glossaryPageTemplate, glossaryHubTemplate
} = require('./templates');

const OUT = path.join(__dirname, '../');

function mkdir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }
function write(filePath, content) {
  mkdir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('  ✓ ' + filePath.replace(OUT, ''));
}

function buildHub(cat) {
  write(path.join(OUT, cat.id, 'index.html'), categoryHubTemplate(cat, CATEGORIES));
}

function buildConverter(cat, conv) {
  write(path.join(OUT, cat.id, conv.slug, 'index.html'), converterPageTemplate(cat, conv));
}

function buildGlossary() {
  // Hub page
  write(path.join(OUT, 'glossary', 'index.html'), glossaryHubTemplate(CATEGORIES));

  // One page per unit
  CATEGORIES.forEach(cat => {
    cat.units.forEach(unit => {
      // Find converters that involve this unit
      const related = cat.converters.filter(c => c.from === unit.id || c.to === unit.id);
      // Enrich unit with about text from converters if not already set
      if (!unit.about) {
        const c = cat.converters.find(c => c.from === unit.id);
        if (c) unit.about = c.aboutFrom;
        else {
          const c2 = cat.converters.find(c => c.to === unit.id);
          if (c2) unit.about = c2.aboutTo;
        }
      }
      write(
        path.join(OUT, 'glossary', unit.id, 'index.html'),
        glossaryPageTemplate(unit, cat, related, CATEGORIES)
      );
    });
  });
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    `  <url><loc>${SITE.domain}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    `  <url><loc>${SITE.domain}/glossary/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
  ];
  CATEGORIES.forEach(cat => {
    urls.push(`  <url><loc>${SITE.domain}/${cat.id}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
    cat.converters.forEach(conv => {
      const p = conv.popular ? '0.9' : '0.7';
      urls.push(`  <url><loc>${SITE.domain}/${cat.id}/${conv.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${p}</priority></url>`);
    });
    cat.units.forEach(unit => {
      urls.push(`  <url><loc>${SITE.domain}/glossary/${unit.id}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
    });
  });
  write(path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`
  );
}

const [,, filterCat, filterSlug] = process.argv;
const t0 = Date.now();

console.log('\n🔨 ChangingUnits build');
console.log('   Output:', OUT, '\n');
mkdir(OUT);

let n = 0;

if (!filterCat || filterCat === 'glossary') {
  console.log('📖 Glossary (/glossary/)');
  buildGlossary();
  n += CATEGORIES.reduce((acc, cat) => acc + cat.units.length, 0) + 1;
}

CATEGORIES.forEach(cat => {
  if (filterCat && filterCat !== 'glossary' && cat.id !== filterCat) return;
  if (filterCat === 'glossary') return;
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

console.log(`\n✅ ${n} page${n !== 1 ? 's' : ''} in ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);
