// Projects data/geo/world.geojson into SVG path data for the choropleth,
// joined against the composite scores dataset. Run before inject.js.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const world = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'geo', 'world.geojson'), 'utf8'));
const composite = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'data', 'composite', 'biggestpicture-scores-2021-2022.json'), 'utf8')
);

const byIso = {};
composite.forEach((d) => { byIso[d.iso3] = d; });

const WIDTH = 980;
const TOP_LAT = 83;
const BOTTOM_LAT = -58;
const HEIGHT = Math.round((WIDTH * (TOP_LAT - BOTTOM_LAT)) / 360);

function project([lon, lat]) {
  const x = (lon + 180) * (WIDTH / 360);
  const y = (TOP_LAT - lat) * (HEIGHT / (TOP_LAT - BOTTOM_LAT));
  return x.toFixed(1) + ',' + y.toFixed(1);
}

function ringToPath(ring) {
  return ring.map((c, i) => (i === 0 ? 'M' : 'L') + project(c)).join('') + 'Z';
}

function geometryToPath(geom) {
  if (!geom) return '';
  if (geom.type === 'Polygon') return geom.coordinates.map(ringToPath).join(' ');
  if (geom.type === 'MultiPolygon') return geom.coordinates.map((poly) => poly.map(ringToPath).join(' ')).join(' ');
  return '';
}

const countries = [];
let matched = 0;
world.features.forEach((f) => {
  if (f.id === 'ATA') return;
  const d = geometryToPath(f.geometry);
  if (!d) return;
  const rec = byIso[f.id] || null;
  if (rec) matched++;
  countries.push({
    iso3: f.id,
    name: (rec && rec.country) || f.properties.name,
    d,
    aigs: rec ? rec.aigs_score : null,
    move: rec ? rec.movement_regulation_score : null,
    digi: rec ? rec.digital_surveillance_score : null,
  });
});

fs.writeFileSync(
  path.join(__dirname, 'countries_paths.json'),
  JSON.stringify({ width: WIDTH, height: HEIGHT, countries })
);
console.log('countries rendered:', countries.length, 'matched to data:', matched, 'viewbox', WIDTH, HEIGHT);
