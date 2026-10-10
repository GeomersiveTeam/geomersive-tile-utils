const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("samples/tile-bbox.json has a [west, south, east, north] bbox", () => {
  const sample = JSON.parse(fs.readFileSync("samples/tile-bbox.json", "utf8"));
  const [west, south, east, north] = sample.bbox;
  assert.ok(west < east && south < north);
});
