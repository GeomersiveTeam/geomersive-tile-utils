const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const JSON5 = require("json5");

test("samples/tile-bbox.json has a [west, south, east, north] bbox", () => {
  const sample = JSON5.parse(fs.readFileSync("samples/tile-bbox.json", "utf8"));
  const [west, south, east, north] = sample.bbox;
  assert.ok(west < east && south < north);
});
