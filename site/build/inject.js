// Splices countries_paths.json (from generate_paths.js) into template.html
// and writes the final static page to site/index.html.
const fs = require('fs');
const path = require('path');
const dir = __dirname;

const tpl = fs.readFileSync(path.join(dir, 'template.html'), 'utf8');
const cp = JSON.parse(fs.readFileSync(path.join(dir, 'countries_paths.json'), 'utf8'));

const ROOT = path.join(dir, '..', '..');
const questionsRegistry = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'data', 'questions', 'questions.json'), 'utf8')
);
const qCountriesDir = path.join(ROOT, 'data', 'questions', 'countries');
const questionCountries = fs
  .readdirSync(qCountriesDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(qCountriesDir, f), 'utf8')))
  .sort((a, b) => a.country.localeCompare(b.country));

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const pathsMarkup = cp.countries
  .map((c) => `<path class="country" data-iso3="${c.iso3}" tabindex="0" role="img" aria-label="${esc(c.name)}" d="${c.d}"></path>`)
  .join('\n');

const dataOnly = {
  countries: cp.countries.map((c) => ({ iso3: c.iso3, name: c.name, aigs: c.aigs, move: c.move, digi: c.digi })),
};

const questionsData = {
  questions: questionsRegistry.questions.map((q) => ({ id: q.id, text: q.text })),
  countries: questionCountries,
};

const out = tpl
  .replace('__VB_W__', String(cp.width))
  .replace('__VB_H__', String(cp.height))
  .replace('__PATHS__', pathsMarkup)
  .replace('__DATA__', JSON.stringify(dataOnly))
  .replace('__QUESTIONS_DATA__', JSON.stringify(questionsData));

fs.writeFileSync(path.join(dir, '..', 'index.html'), out, 'utf8');
console.log('wrote site/index.html, bytes:', Buffer.byteLength(out, 'utf8'));
