// ============================================================
// TEMPLATES.JS — Master HTML templates for each page type
// Edit these to change the design across ALL pages at once
// ============================================================

const { SITE } = require('./data');

// ── SHARED PARTIALS ──────────────────────────────────────────
// These are reused across every template

function navPartial(activeCategory = '') {
  const links = ['length','weight','temperature','area','volume'];
  const navLinks = links.map(l =>
    `<a href="/${l}/" class="nav-link${activeCategory === l ? ' active' : ''}">${l.charAt(0).toUpperCase() + l.slice(1)}</a>`
  ).join('\n    ');
  return `
<header class="nav">
  <a href="/" class="logo">Changing<span>Units</span></a>
  <div class="nav-search-wrap">
    <svg class="si" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <input type="text" id="navSearch" placeholder="Search any conversion…" autocomplete="off" aria-label="Search">
    <div class="nav-drop" id="navDrop" role="listbox"></div>
  </div>
  <nav class="nav-links" aria-label="Main categories">
    ${navLinks}
    <button class="nav-more">More ▾</button>
  </nav>
</header>`;
}

function footerPartial() {
  return `
<footer>
  <div class="footer-inner">
    <div class="footer-logo">Changing<span>Units</span></div>
    <div class="footer-links">
      <a href="/about/">About</a>
      <a href="/glossary/">Glossary</a>
      <a href="/contact/">Contact</a>
      <a href="/privacy-policy/">Privacy</a>
      <a href="/disclaimer/">Disclaimer</a>
    </div>
    <div class="footer-copy">© ${SITE.year} ChangingUnits. All rights reserved.</div>
  </div>
</footer>`;
}

function headPartial({ title, description, canonical, schema }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${SITE.ga4}');
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">`;
}

// ── SHARED CSS ────────────────────────────────────────────────
// Edit once — updates every page
const SHARED_CSS = `
  :root {
    --accent:#4F46E5; --accent-light:#EEF2FF; --accent-dark:#3730A3;
    --bg:#FFFFFF; --bg-2:#F8F8F7; --bg-3:#F2F2F0;
    --t1:#111110; --t2:#6B6B68; --t3:#9B9B96;
    --border:rgba(0,0,0,0.08); --border-s:rgba(0,0,0,0.14);
    --r1:4px; --r2:8px; --r3:12px;
    --sh:0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04);
    --font:'Plus Jakarta Sans',sans-serif;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{font-size:16px;-webkit-font-smoothing:antialiased;}
  body{font-family:var(--font);background:var(--bg-2);color:var(--t1);min-height:100vh;line-height:1.6;}
  a{color:var(--accent);text-decoration:none;}
  a:hover{text-decoration:underline;}
  button{font-family:var(--font);cursor:pointer;border:none;background:none;}
  .nav{position:sticky;top:0;z-index:100;height:60px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;gap:24px;}
  .logo{font-size:17px;font-weight:600;color:var(--t1);letter-spacing:-0.4px;white-space:nowrap;}
  .logo span{color:var(--accent);}
  .nav-search-wrap{flex:1;max-width:400px;position:relative;}
  .nav-search-wrap input{width:100%;height:36px;border:1px solid var(--border-s);border-radius:20px;background:var(--bg-2);padding:0 14px 0 38px;font-family:var(--font);font-size:14px;color:var(--t1);outline:none;transition:border-color 0.15s;}
  .nav-search-wrap input:focus{border-color:var(--accent);background:var(--bg);}
  .nav-search-wrap input::placeholder{color:var(--t3);}
  .nav-search-wrap .si{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--t3);pointer-events:none;}
  .nav-drop{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--bg);border:1px solid var(--border-s);border-radius:var(--r2);box-shadow:var(--sh);overflow:hidden;display:none;z-index:200;}
  .nav-drop.open{display:block;}
  .nav-drop-item{display:flex;align-items:center;gap:10px;padding:9px 12px;cursor:pointer;font-size:13px;transition:background 0.1s;}
  .nav-drop-item:hover{background:var(--bg-2);}
  .nav-drop-icon{width:28px;height:28px;border-radius:var(--r1);background:var(--accent-light);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;color:var(--accent);}
  .nav-drop-name{font-weight:500;color:var(--t1);}
  .nav-drop-cat{font-size:11px;color:var(--t3);}
  .nav-links{display:flex;align-items:center;gap:2px;margin-left:auto;}
  .nav-link{padding:5px 10px;border-radius:var(--r1);font-size:13px;font-weight:500;color:var(--t2);transition:background 0.15s,color 0.15s;white-space:nowrap;}
  .nav-link:hover{background:var(--bg-2);color:var(--t1);text-decoration:none;}
  .nav-link.active{color:var(--accent);background:var(--accent-light);}
  .nav-more{padding:5px 10px;border-radius:var(--r1);font-size:13px;font-weight:500;color:var(--t2);display:flex;align-items:center;gap:3px;transition:background 0.15s,color 0.15s;}
  .nav-more:hover{background:var(--bg-2);color:var(--t1);}
  .breadcrumb{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--t3);padding:18px 0 0;}
  .breadcrumb a{color:var(--t3);}
  .breadcrumb a:hover{color:var(--accent);text-decoration:none;}
  .breadcrumb .current{color:var(--t2);font-weight:500;}
  .page-wrap{max-width:1080px;margin:0 auto;padding:0 24px 80px;}
  footer{border-top:1px solid var(--border);background:var(--bg);padding:28px 24px;margin-top:60px;}
  .footer-inner{max-width:1080px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;}
  .footer-logo{font-size:15px;font-weight:600;color:var(--t1);}
  .footer-logo span{color:var(--accent);}
  .footer-links{display:flex;gap:20px;flex-wrap:wrap;}
  .footer-links a{font-size:12px;color:var(--t2);}
  .footer-links a:hover{color:var(--accent);}
  .footer-copy{font-size:11px;color:var(--t3);}
  @keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
  @media(max-width:760px){.nav-links{display:none;}.nav{padding:0 16px;gap:12px;}.page-wrap{padding:0 16px 60px;}}`;

// ── NAV SEARCH JS ─────────────────────────────────────────────
const NAV_SEARCH_JS = `
  var SEARCH_DATA = [
    {name:'cm to inches',cat:'Length',url:'/length/cm-to-inches/'},
    {name:'inches to cm',cat:'Length',url:'/length/inches-to-cm/'},
    {name:'km to miles',cat:'Length',url:'/length/km-to-miles/'},
    {name:'meters to feet',cat:'Length',url:'/length/meters-to-feet/'},
    {name:'kg to lbs',cat:'Weight',url:'/weight/kg-to-lbs/'},
    {name:'lbs to kg',cat:'Weight',url:'/weight/lbs-to-kg/'},
    {name:'celsius to fahrenheit',cat:'Temperature',url:'/temperature/celsius-to-fahrenheit/'},
    {name:'fahrenheit to celsius',cat:'Temperature',url:'/temperature/fahrenheit-to-celsius/'},
    {name:'sqft to sqm',cat:'Area',url:'/area/sqft-to-sqm/'},
    {name:'mpg to l/100km',cat:'Fuel',url:'/fuel/mpg-to-l100km/'},
    {name:'usd to aed',cat:'Currency',url:'/currency/usd-to-aed/'},
    {name:'liters to gallons',cat:'Volume',url:'/volume/liters-to-gallons/'},
  ];
  var $ns = document.getElementById('navSearch');
  var $nd = document.getElementById('navDrop');
  if ($ns) {
    $ns.addEventListener('input', function() {
      var q = $ns.value.toLowerCase().trim();
      if (!q) { $nd.classList.remove('open'); return; }
      var hits = SEARCH_DATA.filter(function(c) {
        return c.name.indexOf(q) !== -1 || c.cat.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 6);
      if (!hits.length) { $nd.classList.remove('open'); return; }
      $nd.innerHTML = hits.map(function(r) {
        return '<div class="nav-drop-item" data-url="' + r.url + '" role="option">'
          + '<div class="nav-drop-icon">&#x21C4;</div>'
          + '<div><div class="nav-drop-name">' + r.name + '</div>'
          + '<div class="nav-drop-cat">' + r.cat + '</div></div></div>';
      }).join('');
      $nd.classList.add('open');
    });
    $nd.addEventListener('click', function(e) {
      var item = e.target.closest('.nav-drop-item');
      if (item && item.dataset.url) window.location.href = item.dataset.url;
    });
    $ns.addEventListener('keydown', function(e) { if (e.key === 'Escape') $nd.classList.remove('open'); });
    document.addEventListener('click', function(e) { if (!$ns.contains(e.target)) $nd.classList.remove('open'); });
  }`;

// ── CONVERTER PAGE TEMPLATE ───────────────────────────────────
function converterPageTemplate(cat, conv) {
  const { from, to, fromName, toName, slug, factor, formula, reverseFormula,
          refValues, titleTag, metaDesc, aboutFrom, aboutTo, nistLink,
          glossaryFrom, glossaryTo, isTemp } = conv;

  const url = `${SITE.domain}/${cat.id}/${slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": titleTag,
    "url": url,
    "description": metaDesc,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",      "item": SITE.domain + "/" },
        { "@type": "ListItem", "position": 2, "name": cat.name,    "item": SITE.domain + "/" + cat.id + "/" },
        { "@type": "ListItem", "position": 3, "name": titleTag,    "item": url }
      ]
    }
  };

  // Build conversion JS based on type
  const convJS = isTemp ? buildTempConvJS(from, to) : `
  var FACTOR = ${factor};
  function conv(v) { return swapped ? v / FACTOR : v * FACTOR; }`;

  const refRows = refValues.map(v => `{v:${v}}`).join(',');

  return `${headPartial({ title: `${titleTag} | ChangingUnits`, description: metaDesc, canonical: url, schema })}
  <style>
  ${SHARED_CSS}
  .page-grid{display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:20px;align-items:start;margin-top:20px;}
  .main-col{display:flex;flex-direction:column;gap:14px;min-width:0;}
  .page-title{font-size:26px;font-weight:600;color:var(--t1);letter-spacing:-0.5px;line-height:1.2;}
  .page-subtitle{font-size:14px;color:var(--t2);margin-top:5px;}
  .card{background:var(--bg);border:1px solid var(--border);border-radius:var(--r3);padding:22px;box-shadow:var(--sh);}
  .card{animation:fadeUp 0.25s ease both;}
  .card:nth-child(2){animation-delay:0.05s;}
  .card:nth-child(3){animation-delay:0.10s;}
  .card:nth-child(4){animation-delay:0.15s;}
  .card-label{font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:14px;}
  .conv-row{display:grid;grid-template-columns:1fr 48px 1fr;gap:10px;align-items:end;}
  .input-group{display:flex;flex-direction:column;gap:6px;}
  .input-label{font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:0.06em;}
  .input-field{width:100%;height:60px;border:1.5px solid var(--border-s);border-radius:var(--r2);padding:0 14px;font-family:var(--font);font-size:24px;font-weight:600;color:var(--t1);background:var(--bg-2);outline:none;transition:border-color 0.15s;letter-spacing:-0.4px;}
  .input-field:focus{border-color:var(--accent);background:var(--bg);}
  .input-field.result-field{background:var(--accent-light);border-color:transparent;color:var(--accent-dark);cursor:default;}
  .unit-label{font-size:12px;font-weight:500;color:var(--t2);margin-top:5px;}
  .swap-col{display:flex;align-items:center;justify-content:center;padding-bottom:22px;}
  .swap-btn{width:40px;height:40px;border-radius:50%;border:1.5px solid var(--border-s);background:var(--bg);display:flex;align-items:center;justify-content:center;color:var(--t2);transition:border-color 0.15s,color 0.15s,transform 0.3s ease;box-shadow:var(--sh);}
  .swap-btn:hover{border-color:var(--accent);color:var(--accent);transform:rotate(180deg);}
  .result-bar{margin-top:16px;padding:13px 16px;background:var(--bg-2);border-radius:var(--r2);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
  .result-text{font-size:15px;font-weight:500;color:var(--t1);}
  .result-text .val{color:var(--accent);}
  .copy-btn{display:flex;align-items:center;gap:5px;padding:5px 12px;border-radius:var(--r1);border:1px solid var(--border-s);background:var(--bg);font-size:12px;font-weight:500;color:var(--t2);transition:all 0.15s;}
  .copy-btn:hover{border-color:var(--accent);color:var(--accent);}
  .copy-btn.copied{border-color:#10B981;color:#10B981;}
  table{width:100%;border-collapse:collapse;}
  thead th{font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:0.05em;padding:0 10px 10px;text-align:left;border-bottom:1px solid var(--border);}
  tbody tr{transition:background 0.1s;}
  tbody tr:hover{background:var(--bg-2);}
  tbody td{padding:9px 10px;font-size:13px;border-bottom:1px solid var(--border);}
  tbody tr:last-child td{border-bottom:none;}
  tbody td:first-child{color:var(--t2);}
  tbody td:last-child{font-weight:500;color:var(--accent);}
  .formula-code{background:var(--bg-2);border-radius:var(--r2);padding:13px 16px;font-family:'Courier New',monospace;font-size:14px;color:var(--accent-dark);font-weight:600;margin-bottom:12px;border-left:3px solid var(--accent);}
  .formula-desc{font-size:13px;color:var(--t2);line-height:1.65;}
  .about-text p{font-size:13px;color:var(--t2);line-height:1.75;margin-bottom:10px;}
  .about-text p:last-child{margin-bottom:0;}
  .about-text strong{color:var(--t1);font-weight:600;}
  .about-link{color:var(--accent);font-size:13px;}
  .about-link:hover{text-decoration:underline;}
  .about-sources{font-size:12px;color:var(--t3);border-top:1px solid var(--border);padding-top:10px;margin-top:10px;}
  .sidebar{display:flex;flex-direction:column;gap:12px;width:220px;min-width:0;}
  .s-card{background:var(--bg);border:1px solid var(--border);border-radius:var(--r3);padding:14px;box-shadow:var(--sh);width:100%;}
  .s-title{font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;display:block;}
  .s-links{display:flex;flex-direction:column;}
  .s-link{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:6px 6px;border-radius:var(--r1);font-size:12px;font-weight:500;color:var(--t2);gap:4px;text-decoration:none;transition:background 0.1s,color 0.1s;width:100%;}
  .s-link:hover{background:var(--bg-2);color:var(--t1);text-decoration:none;}
  .s-link.active{background:var(--accent-light);color:var(--accent);}
  .s-link-text{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .s-link svg{flex-shrink:0;opacity:0.3;}
  .s-link:hover svg{opacity:0.6;}
  .s-link.active svg{opacity:1;}
  .s-pop{font-size:9px;padding:1px 5px;border-radius:3px;background:var(--accent-light);color:var(--accent);font-weight:700;flex-shrink:0;white-space:nowrap;}
  .s-divider{height:1px;background:var(--border);margin:2px 0;}
  .share-row{display:flex;flex-direction:row;gap:6px;align-items:center;}
  .share-input{flex:1;min-width:0;width:0;font-size:10px;color:var(--t2);background:var(--bg-2);border:1px solid var(--border);border-radius:var(--r1);padding:6px 7px;font-family:'Courier New',monospace;outline:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:border-color 0.15s;}
  .share-input:focus{border-color:var(--accent);overflow-x:auto;text-overflow:clip;}
  .share-btn{flex-shrink:0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:var(--r1);border:1px solid var(--border-s);background:var(--bg);color:var(--t2);cursor:pointer;transition:all 0.15s;}
  .share-btn:hover{border-color:var(--accent);color:var(--accent);}
  @media(max-width:760px){.page-grid{grid-template-columns:1fr;}.sidebar{display:none;}.conv-row{grid-template-columns:1fr 40px 1fr;}}
  @media(max-width:480px){.conv-row{grid-template-columns:1fr;gap:8px;}.swap-col{padding-bottom:0;}}
  </style>
</head>
<body>
${navPartial(cat.id)}
<main>
<div class="page-wrap">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a><span>›</span>
    <a href="/${cat.id}/">${cat.name}</a><span>›</span>
    <span class="current">${fromName} to ${toName}</span>
  </nav>
  <div class="page-grid">
    <div class="main-col">
      <div>
        <h1 class="page-title">${fromName} to ${toName}</h1>
        <p class="page-subtitle">Type a value — result updates instantly.</p>
      </div>
      <div class="card">
        <div class="conv-row">
          <div class="input-group">
            <label class="input-label" for="inputFrom">${fromName}</label>
            <input type="number" id="inputFrom" class="input-field" value="1" inputmode="decimal" aria-label="Value in ${fromName.toLowerCase()}">
            <span class="unit-label" id="fromUnit">${from}</span>
          </div>
          <div class="swap-col">
            <button class="swap-btn" id="swapBtn" aria-label="Swap units" title="Swap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M4 9h16M4 9l4-4M4 9l4 4M20 15H4M20 15l-4-4M20 15l-4 4"/>
              </svg>
            </button>
          </div>
          <div class="input-group">
            <label class="input-label" for="inputTo">${toName}</label>
            <input type="text" id="inputTo" class="input-field result-field" readonly aria-label="Result in ${toName.toLowerCase()}" aria-live="polite">
            <span class="unit-label" id="toUnit">${to}</span>
          </div>
        </div>
        <div class="result-bar">
          <span class="result-text" id="resultText">1 ${from} = <span class="val">— ${to}</span></span>
          <button class="copy-btn" id="copyBtn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            Copy
          </button>
        </div>
      </div>
      <div class="card">
        <p class="card-label">Quick reference</p>
        <table>
          <thead><tr><th id="thFrom">${fromName} (${from})</th><th id="thTo">${toName} (${to})</th></tr></thead>
          <tbody id="refTable"></tbody>
        </table>
      </div>
      <div class="card">
        <p class="card-label">Formula</p>
        <div class="formula-code" id="formulaBox">${formula}</div>
        <p class="formula-desc" id="formulaDesc">${buildFormulaDesc(conv)}</p>
      </div>
      <div class="card">
        <p class="card-label">About this conversion</p>
        <div class="about-text">
          <p>${aboutFrom} <a href="${glossaryFrom}" class="about-link">Learn more \u2192</a></p>
          <p>${aboutTo} <a href="${glossaryTo}" class="about-link">Learn more \u2192</a></p>
          <p class="about-sources">Source: <a href="${nistLink}" target="_blank" rel="noopener noreferrer" class="about-link">NIST International Reference</a></p>
        </div>
      </div>
    </div>
    <aside class="sidebar" aria-label="Related converters">
      <div class="s-card">
        <span class="s-title">${cat.name} converters</span>
        <div class="s-links">
          <a href="/${cat.id}/${slug}/" class="s-link active" aria-current="page">
            <span class="s-link-text">${from} \u2192 ${to}</span>
            <span class="s-pop">open</span>
          </a>
          <div class="s-divider"></div>
          ${buildSidebarLinks(cat, slug)}
          <div class="s-divider"></div>
          <a href="/${cat.id}/" class="s-link" style="color:var(--accent)">
            <span class="s-link-text">View all ${cat.name.toLowerCase()}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </div>
      </div>
      <div class="s-card">
        <span class="s-title">Share this result</span>
        <div class="share-row">
          <input type="text" class="share-input" id="shareUrl" readonly value="changingunits.com/${cat.id}/${slug}/?v=1" aria-label="Shareable URL">
          <button class="share-btn" id="shareCopyBtn" aria-label="Copy link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </button>
        </div>
      </div>
      <div class="s-card">
        <span class="s-title">Other categories</span>
        <div class="s-links">
          ${buildOtherCatLinks(cat.id)}
        </div>
      </div>
    </aside>
  </div>
</div>
</main>
${footerPartial()}
<script>
  ${convJS}
  var swapped = false;
  var REF_ROWS = [${refRows}].map(function(r){return r.v;});
  var FROM_NAME = '${fromName}', TO_NAME = '${toName}';
  var FROM_UNIT = '${from}', TO_UNIT = '${to}';
  var FORMULA_FWD = '${formula}', FORMULA_REV = '${reverseFormula}';

  var $from   = document.getElementById('inputFrom');
  var $to     = document.getElementById('inputTo');
  var $result = document.getElementById('resultText');
  var $copy   = document.getElementById('copyBtn');
  var $swap   = document.getElementById('swapBtn');
  var $share  = document.getElementById('shareUrl');
  var $scopy  = document.getElementById('shareCopyBtn');
  var $table  = document.getElementById('refTable');

  function labels() {
    return swapped
      ? {from:TO_NAME, fu:TO_UNIT, to:FROM_NAME, tu:FROM_UNIT}
      : {from:FROM_NAME, fu:FROM_UNIT, to:TO_NAME,   tu:TO_UNIT};
  }

  function fmt(n) {
    if (isNaN(n)) return '';
    if (Math.abs(n) >= 1000) return n.toLocaleString('en',{maximumFractionDigits:1});
    if (Math.abs(n) >= 10)   return parseFloat(n.toFixed(2)).toString();
    return parseFloat(n.toFixed(4)).toString();
  }

  function updateURL(v) {
    var path = swapped ? '/${cat.id}/${buildReverseSlug(conv)}/' : '/${cat.id}/${slug}/';
    var url  = path + '?v=' + v;
    try { history.replaceState({}, '', url); } catch(e) {}
    $share.value = 'changingunits.com' + url;
  }

  function update() {
    var raw = parseFloat($from.value);
    var L = labels();
    if (isNaN(raw)) { $to.value = ''; $result.innerHTML = '\u2014'; return; }
    var res = conv(raw);
    $to.value = fmt(res);
    $result.innerHTML = raw.toLocaleString() + ' ' + L.fu + ' = <span class="val">' + fmt(res) + ' ' + L.tu + '</span>';
    updateURL(raw);
  }

  function buildTable() {
    var L = labels();
    document.getElementById('thFrom').textContent = L.from + ' (' + L.fu + ')';
    document.getElementById('thTo').textContent   = L.to   + ' (' + L.tu + ')';
    $table.innerHTML = REF_ROWS.map(function(v) {
      var res = conv(v);
      return '<tr><td>' + v + ' ' + L.fu + '</td><td>' + fmt(res) + ' ' + L.tu + '</td></tr>';
    }).join('');
  }

  function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(function() {
      var orig = btn.innerHTML;
      btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Copied';
      btn.classList.add('copied');
      setTimeout(function() { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
    });
  }

  $swap.addEventListener('click', function() {
    swapped = !swapped;
    var L = labels();
    var curRes = parseFloat($to.value);
    $from.value = isNaN(curRes) ? '' : curRes;
    document.querySelector('label[for=inputFrom]').textContent = L.from;
    document.querySelector('label[for=inputTo]').textContent   = L.to;
    document.getElementById('fromUnit').textContent = L.fu;
    document.getElementById('toUnit').textContent   = L.tu;
    document.getElementById('formulaBox').textContent = swapped ? FORMULA_REV : FORMULA_FWD;
    buildTable();
    update();
  });

  $copy.addEventListener('click', function() { copyText($result.textContent, $copy); });
  $scopy.addEventListener('click', function() { copyText(window.location.href, $scopy); });
  $from.addEventListener('input', update);

  var urlV = new URLSearchParams(window.location.search).get('v');
  if (urlV) { $from.value = urlV; }

  /* VISIT TRACKING */
  (function() {
    var PAGE = { url: '/${cat.id}/${slug}/', name: '${from} \u2192 ${to}', cat: '${cat.name}' };
    var KEY  = 'cu_visits';
    try {
      var stored = JSON.parse(localStorage.getItem(KEY) || '{}');
      var entry  = stored[PAGE.url] || { name: PAGE.name, cat: PAGE.cat, url: PAGE.url, count: 0 };
      entry.count += 1; entry.last = Date.now();
      stored[PAGE.url] = entry;
      localStorage.setItem(KEY, JSON.stringify(stored));
    } catch(e) {}
  })();

  ${NAV_SEARCH_JS}
  buildTable();
  update();
</script>
</body>
</html>`;
}

// ── HELPER FUNCTIONS ──────────────────────────────────────────
function buildFormulaDesc(conv) {
  if (conv.isTemp) {
    const descs = {
      'c_f': 'Multiply Celsius by 9/5 then add 32. For example, 20°C × 9/5 + 32 = 68°F. To reverse, subtract 32 then multiply by 5/9.',
      'f_c': 'Subtract 32 from Fahrenheit then multiply by 5/9. For example, (68°F − 32) × 5/9 = 20°C.',
      'c_k': 'Add 273.15 to the Celsius value. For example, 20°C + 273.15 = 293.15 K.',
      'k_c': 'Subtract 273.15 from the Kelvin value. For example, 293.15 K − 273.15 = 20°C.',
    };
    return descs[conv.from + '_' + conv.to] || 'Apply the formula above to convert between the two temperature scales.';
  }
  return `Multiply the ${conv.fromName.toLowerCase()} value by ${conv.factor} to get ${conv.toName.toLowerCase()}. To reverse — divide ${conv.toName.toLowerCase()} by ${conv.factor} to get ${conv.fromName.toLowerCase()}.`;
}

function buildTempConvJS(from, to) {
  const fns = {
    'c_f': 'function conv(v) { return swapped ? (v - 32) * 5/9 : v * 9/5 + 32; }',
    'f_c': 'function conv(v) { return swapped ? v * 9/5 + 32 : (v - 32) * 5/9; }',
    'c_k': 'function conv(v) { return swapped ? v - 273.15 : v + 273.15; }',
    'k_c': 'function conv(v) { return swapped ? v + 273.15 : v - 273.15; }',
    'f_k': 'function conv(v) { return swapped ? (v - 273.15) * 9/5 + 32 : (v - 32) * 5/9 + 273.15; }',
    'k_f': 'function conv(v) { return swapped ? (v - 32) * 5/9 + 273.15 : (v - 273.15) * 9/5 + 32; }',
  };
  return fns[from + '_' + to] || 'function conv(v) { return v; }';
}

function buildReverseSlug(conv) {
  // Try to find the reverse converter slug in the same category
  // Falls back to current slug if not found
  return conv.reverseSlug || conv.slug;
}

function buildSidebarLinks(cat, currentSlug) {
  return cat.converters
    .filter(c => c.slug !== currentSlug)
    .slice(0, 7)
    .map(c => `<a href="/${cat.id}/${c.slug}/" class="s-link">
            <span class="s-link-text">${c.from} \u2192 ${c.to}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </a>`)
    .join('\n');
}

function buildOtherCatLinks(currentCatId) {
  const cats = [
    { id: 'weight', emoji: '⚖️', name: 'Weight' },
    { id: 'temperature', emoji: '🌡️', name: 'Temperature' },
    { id: 'area', emoji: '📐', name: 'Area' },
    { id: 'volume', emoji: '🧪', name: 'Volume' },
    { id: 'speed', emoji: '🚀', name: 'Speed' },
    { id: 'length', emoji: '📏', name: 'Length' },
    { id: 'fuel', emoji: '⛽', name: 'Fuel' },
    { id: 'currency', emoji: '💱', name: 'Currency' },
  ];
  return cats
    .filter(c => c.id !== currentCatId)
    .slice(0, 6)
    .map(c => `<a href="/${c.id}/" class="s-link">
            <span class="s-link-text">${c.emoji} ${c.name}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </a>`)
    .join('\n');
}

module.exports = { converterPageTemplate, categoryHubTemplate, SHARED_CSS, NAV_SEARCH_JS, navPartial, footerPartial, headPartial };

// ── CATEGORY HUB TEMPLATE ─────────────────────────────────────
// Source of truth: the approved category-hub-length.html file
// Only the data-driven parts are templated — design is locked to the approved version
function categoryHubTemplate(cat, allCategories) {
  const url = `${SITE.domain}/${cat.id}/`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": cat.title,
    "url": url,
    "description": cat.description,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",   "item": SITE.domain + "/" },
        { "@type": "ListItem", "position": 2, "name": cat.name, "item": url }
      ]
    }
  };

  // Build unit groups HTML for browse section from data
  const groupEmoji = {
    'Metric': '🔵',
    'Imperial / US': '🔴',
    'Nautical & Aviation': '⚓',
    'Scientific & Astronomical': '🔭',
    'Scientific & Precious Metals': '💎',
    'Quirky & Historical': '🎉',
    'Common': '🌡️',
    'Scientific': '⚗️',
  };
  const groups = {};
  const groupOrder = [];
  cat.units.forEach(u => {
    if (!groups[u.group]) { groups[u.group] = []; groupOrder.push(u.group); }
    groups[u.group].push(u);
  });
  const groupCards = groupOrder.map(g => {
    const chips = groups[g].map(u =>
      `          <span class="unit-chip" data-unit="${u.id}">${u.name}</span>`
    ).join('\n');
    return `
      <div class="group-card">
        <div class="group-card-header">
          <span class="group-emoji">${groupEmoji[g] || '📦'}</span>
          <span class="group-title">${g}</span>
        </div>
        <div class="unit-chips">
${chips}
        </div>
      </div>`;
  }).join('\n');

  // Build URL map JS from converter data
  const urlMapEntries = cat.converters
    .map(c => `  '${c.from}_${c.to}': '/${cat.id}/${c.slug}/'`)
    .join(',\n');

  // Build UNITS JS array from data
  const unitsJS = JSON.stringify(cat.units, null, 2);

  // Other categories
  const otherCats = allCategories
    .filter(c => c.id !== cat.id)
    .map(c => `      <a href="/${c.id}/" class="cat-card">${c.emoji} ${c.name}</a>`)
    .join('\n');

  // Nav links with active state
  const navLinks = ['length','weight','temperature','area','volume'].map(l =>
    `    <a href="/${l}/" class="nav-link${cat.id === l ? ' active' : ''}">${l.charAt(0).toUpperCase() + l.slice(1)}</a>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cat.title} — Convert ${cat.name.toLowerCase()} units instantly | ChangingUnits</title>
  <meta name="description" content="${cat.description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <script type="application/ld+json">
  ${JSON.stringify(schema)}
  </script>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${SITE.ga4}');
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent:#4F46E5; --accent-light:#EEF2FF; --accent-dark:#3730A3;
      --bg:#FFFFFF; --bg-2:#F8F8F7;
      --t1:#111110; --t2:#6B6B68; --t3:#9B9B96;
      --border:rgba(0,0,0,0.08); --border-s:rgba(0,0,0,0.14);
      --r1:4px; --r2:8px; --r3:12px;
      --sh:0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04);
      --font:'Plus Jakarta Sans',sans-serif;
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{font-size:16px;-webkit-font-smoothing:antialiased;}
    body{font-family:var(--font);background:var(--bg-2);color:var(--t1);min-height:100vh;line-height:1.6;}
    a{color:var(--accent);text-decoration:none;}
    a:hover{text-decoration:underline;}
    button{font-family:var(--font);cursor:pointer;border:none;background:none;}
    .nav{position:sticky;top:0;z-index:100;height:60px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;gap:24px;}
    .logo{font-size:17px;font-weight:600;color:var(--t1);letter-spacing:-0.4px;white-space:nowrap;}
    .logo span{color:var(--accent);}
    .nav-search-wrap{flex:1;max-width:400px;position:relative;}
    .nav-search-wrap input{width:100%;height:36px;border:1px solid var(--border-s);border-radius:20px;background:var(--bg-2);padding:0 14px 0 38px;font-family:var(--font);font-size:14px;color:var(--t1);outline:none;transition:border-color 0.15s;}
    .nav-search-wrap input:focus{border-color:var(--accent);background:var(--bg);}
    .nav-search-wrap input::placeholder{color:var(--t3);}
    .nav-search-wrap .si{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--t3);pointer-events:none;}
    .nav-drop{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--bg);border:1px solid var(--border-s);border-radius:var(--r2);box-shadow:var(--sh);overflow:hidden;display:none;z-index:200;}
    .nav-drop.open{display:block;}
    .nav-drop-item{display:flex;align-items:center;gap:10px;padding:9px 12px;cursor:pointer;font-size:13px;transition:background 0.1s;}
    .nav-drop-item:hover{background:var(--bg-2);}
    .nav-drop-icon{width:28px;height:28px;border-radius:var(--r1);background:var(--accent-light);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;color:var(--accent);}
    .nav-drop-name{font-weight:500;color:var(--t1);}
    .nav-drop-cat{font-size:11px;color:var(--t3);}
    .nav-links{display:flex;align-items:center;gap:2px;margin-left:auto;}
    .nav-link{padding:5px 10px;border-radius:var(--r1);font-size:13px;font-weight:500;color:var(--t2);transition:background 0.15s,color 0.15s;white-space:nowrap;}
    .nav-link:hover{background:var(--bg-2);color:var(--t1);text-decoration:none;}
    .nav-link.active{color:var(--accent);background:var(--accent-light);}
    .nav-more{padding:5px 10px;border-radius:var(--r1);font-size:13px;font-weight:500;color:var(--t2);display:flex;align-items:center;gap:3px;transition:background 0.15s,color 0.15s;}
    .nav-more:hover{background:var(--bg-2);color:var(--t1);}
    .breadcrumb{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--t3);padding:18px 0 0;}
    .breadcrumb a{color:var(--t3);}
    .breadcrumb a:hover{color:var(--accent);text-decoration:none;}
    .breadcrumb .current{color:var(--t2);font-weight:500;}
    .page-wrap{max-width:1080px;margin:0 auto;padding:0 24px 80px;}
    .page-header{margin-top:24px;margin-bottom:28px;}
    .page-title{font-size:28px;font-weight:600;color:var(--t1);letter-spacing:-0.5px;line-height:1.2;}
    .page-subtitle{font-size:15px;color:var(--t2);margin-top:6px;}
    .section{margin-bottom:36px;}
    .section-label{font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;display:block;}
    .picker-card{background:var(--bg);border:1px solid var(--border);border-radius:var(--r3);padding:24px;box-shadow:var(--sh);}
    .picker-cols{display:grid;grid-template-columns:1fr 44px 1fr;gap:0;align-items:start;}
    .picker-col{display:flex;flex-direction:column;gap:8px;}
    .picker-label{font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:0.07em;transition:color 0.15s;}
    .picker-search{position:relative;}
    .picker-search input{width:100%;height:42px;border:1.5px solid var(--border-s);border-radius:var(--r2);background:var(--bg-2);padding:0 12px 0 36px;font-family:var(--font);font-size:14px;color:var(--t1);outline:none;transition:border-color 0.15s;display:block;}
    .picker-search input:focus{border-color:var(--accent);background:var(--bg);}
    .picker-search input::placeholder{color:var(--t3);}
    .picker-search .psi{position:absolute;left:11px;top:13px;color:var(--t3);pointer-events:none;z-index:2;}
    .selected-pill{display:none;position:absolute;top:1px;left:1px;right:1px;bottom:1px;border-radius:calc(var(--r2) - 1px);background:var(--accent-light);align-items:center;padding:0 10px 0 34px;gap:8px;z-index:3;overflow:hidden;}
    .pill-text{flex:1;min-width:0;font-size:13px;font-weight:600;color:var(--accent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .pill-clear{flex-shrink:0;width:20px;height:20px;border-radius:50%;background:rgba(79,70,229,0.15);border:none;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--accent);cursor:pointer;transition:background 0.15s,color 0.15s;font-family:var(--font);line-height:1;}
    .pill-clear:hover{background:var(--accent);color:#fff;}
    .picker-search.has-selection input{color:transparent;background:var(--accent-light);border-color:var(--accent);}
    .picker-search.has-selection .psi{color:var(--accent);}
    .unit-list{border:1px solid var(--border);border-radius:var(--r2);overflow:hidden;max-height:0;overflow-y:auto;transition:max-height 0.2s ease,border-color 0.15s;border-color:transparent;}
    .unit-list.open{max-height:260px;border-color:var(--border);}
    .unit-list::-webkit-scrollbar{width:4px;}
    .unit-list::-webkit-scrollbar-track{background:transparent;}
    .unit-list::-webkit-scrollbar-thumb{background:var(--border-s);border-radius:2px;}
    .unit-group-header{padding:7px 12px;font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:0.07em;background:var(--bg-2);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:1;}
    .unit-option{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;font-size:13px;font-weight:500;color:var(--t2);cursor:pointer;border-bottom:1px solid var(--border);transition:background 0.1s,color 0.1s;gap:6px;}
    .unit-option:last-child{border-bottom:none;}
    .unit-option:hover{background:var(--accent-light);color:var(--accent);}
    .unit-option.selected{background:var(--accent);color:#fff;}
    .unit-option.selected .unit-abbr{color:rgba(255,255,255,0.7);}
    .unit-option.hidden{display:none;}
    .unit-name-text{flex:1;min-width:0;}
    .unit-abbr{font-size:11px;color:var(--t3);flex-shrink:0;}
    .picker-arrow{display:flex;align-items:center;justify-content:center;padding-top:46px;color:var(--t3);}
    .picker-action{margin-top:18px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
    .go-btn{height:42px;padding:0 28px;background:var(--accent);color:#fff;border-radius:var(--r2);font-size:14px;font-weight:600;transition:background 0.15s;border:none;cursor:pointer;font-family:var(--font);}
    .go-btn:hover{background:var(--accent-dark);}
    .go-btn:disabled{background:var(--t3);cursor:default;}
    .picker-hint{font-size:13px;color:var(--t3);}
    .groups-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;}
    .group-card{background:var(--bg);border:1px solid var(--border);border-radius:var(--r3);padding:16px;box-shadow:var(--sh);}
    .group-card-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;}
    .group-emoji{font-size:18px;flex-shrink:0;}
    .group-title{font-size:13px;font-weight:600;color:var(--t1);}
    .unit-chips{display:flex;flex-wrap:wrap;gap:6px;}
    .unit-chip{padding:5px 10px;border-radius:var(--r2);border:1px solid var(--border-s);background:var(--bg-2);font-size:12px;font-weight:500;color:var(--t2);cursor:pointer;transition:all 0.15s;}
    .unit-chip:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-light);}
    .seo-card{background:var(--bg);border:1px solid var(--border);border-radius:var(--r3);padding:24px;box-shadow:var(--sh);}
    .seo-card h2{font-size:16px;font-weight:600;color:var(--t1);margin-bottom:10px;}
    .seo-card p{font-size:13px;color:var(--t2);line-height:1.75;margin-bottom:10px;}
    .seo-card p:last-child{margin-bottom:0;}
    .cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;}
    .cat-card{background:var(--bg);border:1px solid var(--border);border-radius:var(--r2);padding:12px;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;color:var(--t2);box-shadow:var(--sh);transition:all 0.15s;text-decoration:none;}
    .cat-card:hover{border-color:var(--accent);color:var(--accent);text-decoration:none;}
    footer{border-top:1px solid var(--border);background:var(--bg);padding:28px 24px;margin-top:60px;}
    .footer-inner{max-width:1080px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;}
    .footer-logo{font-size:15px;font-weight:600;color:var(--t1);}
    .footer-logo span{color:var(--accent);}
    .footer-links{display:flex;gap:20px;flex-wrap:wrap;}
    .footer-links a{font-size:12px;color:var(--t2);}
    .footer-links a:hover{color:var(--accent);}
    .footer-copy{font-size:11px;color:var(--t3);}
    @keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
    .section{animation:fadeUp 0.25s ease both;}
    .section:nth-child(2){animation-delay:.05s;}
    .section:nth-child(3){animation-delay:.10s;}
    .section:nth-child(4){animation-delay:.15s;}
    .section:nth-child(5){animation-delay:.20s;}
    @media(max-width:680px){
      .nav-links{display:none;}
      .nav{padding:0 16px;gap:12px;}
      .page-wrap{padding:0 16px 60px;}
      .page-title{font-size:22px;}
      .picker-cols{grid-template-columns:1fr;gap:12px;}
      .picker-arrow{padding-top:0;transform:rotate(90deg);}
      .groups-grid{grid-template-columns:1fr 1fr;}
    }
    @media(max-width:400px){.groups-grid{grid-template-columns:1fr;}}
  </style>
</head>
<body>

<header class="nav">
  <a href="/" class="logo">Changing<span>Units</span></a>
  <div class="nav-search-wrap">
    <svg class="si" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <input type="text" id="navSearch" placeholder="Search any conversion\u2026" autocomplete="off" aria-label="Search">
    <div class="nav-drop" id="navDrop" role="listbox"></div>
  </div>
  <nav class="nav-links" aria-label="Main categories">
${navLinks}
    <button class="nav-more">More \u25be</button>
  </nav>
</header>

<main>
<div class="page-wrap">

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a><span>\u203a</span>
    <span class="current">${cat.name}</span>
  </nav>

  <div class="page-header">
    <h1 class="page-title">${cat.title}</h1>
    <p class="page-subtitle">Pick two units and convert instantly \u2014 or browse by unit system below.</p>
  </div>

  <!-- FROM / TO PICKER -->
  <div class="section">
    <div class="picker-card">
      <div class="picker-cols">

        <!-- FROM -->
        <div class="picker-col">
          <span class="picker-label" id="fromLabel">Convert from</span>
          <div class="picker-search" id="fromSearchWrap">
            <svg class="psi" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" id="fromSearch" placeholder="Search unit\u2026" autocomplete="off" aria-label="Search from unit">
            <div class="selected-pill" id="fromPill" style="display:none">
              <span class="pill-text" id="fromPillText"></span>
              <button class="pill-clear" id="fromClear" aria-label="Clear from unit" tabindex="0">\u2715</button>
            </div>
          </div>
          <div class="unit-list" id="fromList" role="listbox" aria-label="From unit"></div>
        </div>

        <!-- ARROW -->
        <div class="picker-arrow" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>

        <!-- TO -->
        <div class="picker-col">
          <span class="picker-label" id="toLabel">Convert to</span>
          <div class="picker-search" id="toSearchWrap">
            <svg class="psi" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" id="toSearch" placeholder="Search unit\u2026" autocomplete="off" aria-label="Search to unit">
            <div class="selected-pill" id="toPill" style="display:none">
              <span class="pill-text" id="toPillText"></span>
              <button class="pill-clear" id="toClear" aria-label="Clear to unit" tabindex="0">\u2715</button>
            </div>
          </div>
          <div class="unit-list" id="toList" role="listbox" aria-label="To unit"></div>
        </div>

      </div>

      <div class="picker-action">
        <button class="go-btn" id="goBtn" disabled>Convert \u203a</button>
        <span class="picker-hint" id="pickerHint">Select a unit in each column</span>
      </div>
    </div>
  </div>

  <!-- BROWSE BY UNIT SYSTEM -->
  <div class="section">
    <span class="section-label">Browse by unit system</span>
    <div class="groups-grid">
${groupCards}
    </div>
  </div>

  <!-- SEO TEXT -->
  <div class="section">
    <div class="seo-card">${cat.seoText}</div>
  </div>

  <!-- OTHER CATEGORIES -->
  <div class="section">
    <span class="section-label">Other categories</span>
    <div class="cat-grid">
${otherCats}
    </div>
  </div>

</div>
</main>

<footer>
  <div class="footer-inner">
    <div class="footer-logo">Changing<span>Units</span></div>
    <div class="footer-links">
      <a href="/about/">About</a>
      <a href="/glossary/">Glossary</a>
      <a href="/contact/">Contact</a>
      <a href="/privacy-policy/">Privacy</a>
      <a href="/disclaimer/">Disclaimer</a>
    </div>
    <div class="footer-copy">\u00a9 ${SITE.year} ChangingUnits. All rights reserved.</div>
  </div>
</footer>

<script>
var UNITS = ${unitsJS};

var URL_MAP = {
${urlMapEntries}
};

var selectedFrom = null;
var selectedTo   = null;

function renderList(listEl, filterText, selectedId, excludeId) {
  var filter = (filterText || '').toLowerCase();
  var groups = {};
  var order  = [];
  UNITS.forEach(function(u) {
    if (u.id === excludeId) return;
    var match = u.name.toLowerCase().indexOf(filter) !== -1
             || u.abbr.toLowerCase().indexOf(filter) !== -1
             || u.group.toLowerCase().indexOf(filter) !== -1;
    if (!match) return;
    if (!groups[u.group]) { groups[u.group] = []; order.push(u.group); }
    groups[u.group].push(u);
  });
  var html = '';
  order.forEach(function(g) {
    html += '<div class="unit-group-header">' + g + '</div>';
    groups[g].forEach(function(u) {
      var sel = u.id === selectedId ? ' selected' : '';
      html += '<div class="unit-option' + sel + '" data-id="' + u.id + '" data-name="' + u.name + '" role="option" aria-selected="' + (u.id === selectedId) + '">'
            + '<span class="unit-name-text">' + u.name + '</span>'
            + '<span class="unit-abbr">' + u.abbr + '</span>'
            + '</div>';
    });
  });
  if (!html) html = '<div style="padding:14px 12px;font-size:13px;color:var(--t3);">No units found</div>';
  listEl.innerHTML = html;
}

function updateButton() {
  var btn  = document.getElementById('goBtn');
  var hint = document.getElementById('pickerHint');
  if (!selectedFrom && !selectedTo) { btn.disabled = true; hint.textContent = 'Select a unit in each column'; return; }
  if (!selectedFrom) { btn.disabled = true; hint.textContent = 'Now select a "convert from" unit'; return; }
  if (!selectedTo)   { btn.disabled = true; hint.textContent = 'Now select a "convert to" unit'; return; }
  if (selectedFrom === selectedTo) { btn.disabled = true; hint.textContent = 'Please select two different units'; return; }
  var key = selectedFrom + '_' + selectedTo;
  var url = URL_MAP[key];
  if (url) { btn.disabled = false; hint.textContent = ''; btn.onclick = function() { window.location.href = url; }; }
  else { btn.disabled = true; hint.textContent = 'This converter is not yet available \u2014 check back soon'; }
}

function openList(side)  { document.getElementById(side + 'List').classList.add('open'); }
function closeList(side) { document.getElementById(side + 'List').classList.remove('open'); }

function showPill(side, unitId) {
  var unit = UNITS.filter(function(u) { return u.id === unitId; })[0];
  if (!unit) return;
  var pill  = document.getElementById(side + 'Pill');
  var ptext = document.getElementById(side + 'PillText');
  var wrap  = document.getElementById(side + 'SearchWrap');
  var input = document.getElementById(side + 'Search');
  ptext.textContent = unit.name + ' (' + unit.abbr + ')';
  pill.style.display = 'flex';
  wrap.classList.add('has-selection');
  input.value = '';
  closeList(side);
}

function clearPill(side) {
  var pill  = document.getElementById(side + 'Pill');
  var wrap  = document.getElementById(side + 'SearchWrap');
  var input = document.getElementById(side + 'Search');
  pill.style.display = 'none';
  wrap.classList.remove('has-selection');
  input.value = '';
  if (side === 'from') {
    selectedFrom = null;
    renderList(document.getElementById('fromList'), '', null, selectedTo);
    renderList(document.getElementById('toList'),   '', selectedTo, null);
  } else {
    selectedTo = null;
    renderList(document.getElementById('toList'), '', null, selectedFrom);
  }
  updateButton();
  input.focus();
  openList(side);
  setActiveSide(side);
}

function bindList(listEl, side) {
  listEl.addEventListener('mousedown', function(e) { e.preventDefault(); });
  listEl.addEventListener('click', function(e) {
    var opt = e.target.closest('.unit-option');
    if (!opt) return;
    var id = opt.getAttribute('data-id');
    if (side === 'from') {
      selectedFrom = id;
      renderList(document.getElementById('toList'), document.getElementById('toSearch').value, selectedTo, selectedFrom);
    } else {
      selectedTo = id;
    }
    var excl = side === 'from' ? null : selectedFrom;
    renderList(listEl, document.getElementById(side === 'from' ? 'fromSearch' : 'toSearch').value, id, excl);
    showPill(side, id);
    updateButton();
    if (side === 'from' && !selectedTo) { setActiveSide('to'); document.getElementById('toSearch').focus(); }
  });
}

function bindSearch(inputEl, listEl, side) {
  inputEl.addEventListener('input', function() {
    var excl = side === 'from' ? null : selectedFrom;
    renderList(listEl, inputEl.value, side === 'from' ? selectedFrom : selectedTo, excl);
  });
}

var activeSide = 'from';
function setActiveSide(side) {
  activeSide = side;
  document.getElementById('fromLabel').style.color = side === 'from' ? 'var(--accent)' : '';
  document.getElementById('toLabel').style.color   = side === 'to'   ? 'var(--accent)' : '';
}

document.addEventListener('click', function(e) {
  var chip = e.target.closest('.unit-chip');
  if (!chip) return;
  var uid = chip.getAttribute('data-unit');
  if (activeSide === 'from') {
    selectedFrom = uid;
    renderList(document.getElementById('fromList'), '', selectedFrom, selectedTo);
    renderList(document.getElementById('toList'),   '', selectedTo,   selectedFrom);
    showPill('from', uid);
    setActiveSide('to');
    document.getElementById('toSearch').focus();
  } else {
    selectedTo = uid;
    renderList(document.getElementById('toList'),   '', selectedTo,   selectedFrom);
    renderList(document.getElementById('fromList'), '', selectedFrom, selectedTo);
    showPill('to', uid);
  }
  updateButton();
  document.querySelector('.picker-card').scrollIntoView({behavior:'smooth', block:'nearest'});
});

${NAV_SEARCH_JS}

var fromList   = document.getElementById('fromList');
var toList     = document.getElementById('toList');
var fromSearch = document.getElementById('fromSearch');
var toSearch   = document.getElementById('toSearch');

renderList(fromList, '', null, null);
renderList(toList,   '', null, null);
bindList(fromList, 'from');
bindList(toList,   'to');
bindSearch(fromSearch, fromList, 'from');
bindSearch(toSearch,   toList,   'to');

fromSearch.addEventListener('focus', function() { setActiveSide('from'); if (!selectedFrom) openList('from'); closeList('to'); });
fromSearch.addEventListener('blur',  function() { setTimeout(function() { closeList('from'); }, 150); });
toSearch.addEventListener('focus',   function() { setActiveSide('to');   if (!selectedTo)   openList('to');   closeList('from'); });
toSearch.addEventListener('blur',    function() { setTimeout(function() { closeList('to');   }, 150); });

document.getElementById('fromClear').addEventListener('click', function(e) { e.stopPropagation(); clearPill('from'); });
document.getElementById('toClear').addEventListener('click',   function(e) { e.stopPropagation(); clearPill('to'); });
document.getElementById('fromPill').addEventListener('click',  function(e) { if (!e.target.closest('.pill-clear')) clearPill('from'); });
document.getElementById('toPill').addEventListener('click',    function(e) { if (!e.target.closest('.pill-clear')) clearPill('to'); });
</script>
</body>
</html>`;
}