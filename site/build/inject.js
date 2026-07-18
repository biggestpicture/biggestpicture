// Splices countries_paths.json (from generate_paths.js) into template.html
// and writes the final static page to site/index.html.
const fs = require('fs');
const path = require('path');
const dir = __dirname;

const tpl = fs.readFileSync(path.join(dir, 'template.html'), 'utf8');
const cp = JSON.parse(fs.readFileSync(path.join(dir, 'countries_paths.json'), 'utf8'));

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const pathsMarkup = cp.countries
  .map((c) => `<path class="country" data-iso3="${c.iso3}" tabindex="0" role="img" aria-label="${esc(c.name)}" d="${c.d}"></path>`)
  .join('\n');

const dataOnly = {
  countries: cp.countries.map((c) => ({ iso3: c.iso3, name: c.name, aigs: c.aigs, move: c.move, digi: c.digi })),
};

const out = tpl
  .replace('__VB_W__', String(cp.width))
  .replace('__VB_H__', String(cp.height))
  .replace('__PATHS__', pathsMarkup)
  .replace('__DATA__', JSON.stringify(dataOnly));

fs.writeFileSync(path.join(dir, '..', 'index.html'), out, 'utf8');
console.log('wrote site/index.html, bytes:', Buffer.byteLength(out, 'utf8'));
