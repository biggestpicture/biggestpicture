// Validates every file in data/questions/countries/*.json against schema.json.
// Hand-rolled rather than pulling in a JSON Schema library, since the schema
// only uses a small fixed set of rules (type, required, enum, minLength,
// minItems, pattern, additionalProperties, date/uri format).
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'countries');
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8'));
const QUESTION_IDS = questions.questions.map((q) => q.id);
const VALUES = questions.scale;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ISO3_RE = /^[A-Z]{3}$/;

function fail(file, msg) {
  errors.push(`${file}: ${msg}`);
}

let errors = [];
let fileCount = 0;

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.json'));

files.forEach((file) => {
  fileCount++;
  const full = path.join(DIR, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (e) {
    fail(file, `invalid JSON — ${e.message}`);
    return;
  }

  if (!ISO3_RE.test(data.iso3)) fail(file, `iso3 must be 3 uppercase letters, got "${data.iso3}"`);
  if (path.basename(file, '.json') !== data.iso3) fail(file, `filename must match iso3 (file is ${file}, iso3 is ${data.iso3})`);
  if (!data.country || typeof data.country !== 'string') fail(file, 'missing or invalid "country"');
  if (!DATE_RE.test(data.last_reviewed)) fail(file, `last_reviewed must be YYYY-MM-DD, got "${data.last_reviewed}"`);
  if (!data.answers || typeof data.answers !== 'object') {
    fail(file, 'missing "answers" object');
    return;
  }

  const answerKeys = Object.keys(data.answers);
  QUESTION_IDS.forEach((qid) => {
    if (!(qid in data.answers)) fail(file, `missing answer for question "${qid}"`);
  });
  answerKeys.forEach((k) => {
    if (!QUESTION_IDS.includes(k)) fail(file, `unknown question id "${k}" — not in questions.json`);
  });

  QUESTION_IDS.forEach((qid) => {
    const a = data.answers[qid];
    if (!a) return;
    if (!VALUES.includes(a.value)) fail(file, `${qid}.value must be one of ${VALUES.join('/')}, got "${a.value}"`);
    if (!a.note || a.note.length < 20) fail(file, `${qid}.note must be a real explanation (>=20 chars), got ${a.note ? a.note.length : 0} chars`);
    if (!Array.isArray(a.sources) || a.sources.length < 1) {
      fail(file, `${qid}.sources must have at least 1 citation`);
    } else {
      a.sources.forEach((s, i) => {
        if (!s.url || !/^https?:\/\//.test(s.url)) fail(file, `${qid}.sources[${i}].url missing or not a valid http(s) URL`);
        if (!s.title) fail(file, `${qid}.sources[${i}].title missing`);
        if (!DATE_RE.test(s.accessed)) fail(file, `${qid}.sources[${i}].accessed must be YYYY-MM-DD`);
      });
    }
  });
});

if (errors.length) {
  console.error(`FAILED — ${errors.length} issue(s) across ${fileCount} file(s):\n`);
  errors.forEach((e) => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log(`OK — ${fileCount} country file(s), all ${QUESTION_IDS.length} questions present and cited.`);
}
