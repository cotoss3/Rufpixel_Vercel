const fs = require('fs');

async function getPage(p) {
  try {
    const res = await fetch(`https://rufpixel.com/wp-json/wc/store/v1/products?per_page=100&page=${p}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'RufPixel-Headless-Storefront/1.0',
      },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {}
  return [];
}

async function run() {
  let all = [];
  for (let p = 1; p <= 10; p++) {
    const data = await getPage(p);
    if (data.length === 0) break;
    all = all.concat(data);
  }

  const allChildIds = new Set();
  all.forEach((p) => {
    (p.grouped_products || []).forEach((id) => allChildIds.add(id));
  });

  const rootProds = all.filter((p) => !allChildIds.has(p.id));

  const catCounts = {};
  rootProds.forEach((prod) => {
    (prod.categories || []).forEach((c) => {
      catCounts[c.name] = (catCounts[c.name] || 0) + 1;
      catCounts[c.slug] = (catCounts[c.slug] || 0) + 1;
    });
  });

  fs.writeFileSync(
    'c:\\Users\\fcontreras\\Desktop\\Vitales locales\\Rufpixel Vercel\\scratch\\results.json',
    JSON.stringify({ totalRaw: all.length, rootCount: rootProds.length, catCounts }, null, 2)
  );
}

run();
