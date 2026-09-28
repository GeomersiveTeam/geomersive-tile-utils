const test = require("node:test");
const assert = require("node:assert");
const { tileCount, lonLatToTile, tileBounds } = require("../lib/tiles");

test("tileCount grows by 4x per zoom level", () => {
  assert.strictEqual(tileCount(0), 1);
  assert.strictEqual(tileCount(1), 4);
  assert.strictEqual(tileCount(10), 1048576);
});

test("lonLatToTile finds the tile for Oslo at zoom 10", () => {
  assert.deepStrictEqual(lonLatToTile(10.7522, 59.9139, 10), { x: 542, y: 297 });
});

test("lonLatToTile puts 0,0 in the centre tile at zoom 1", () => {
  assert.deepStrictEqual(lonLatToTile(0, 0, 1), { x: 1, y: 1 });
});

test("tileBounds returns the bounding box of tile 0/0 at zoom 1", () => {
  const bbox = tileBounds(0, 0, 1).map((v) => Number(v.toFixed(4)));
  assert.deepStrictEqual(bbox, [-180, 85.0511, 0, 0]);
});
