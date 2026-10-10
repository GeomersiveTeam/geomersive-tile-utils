const test = require("node:test");
const assert = require("node:assert");
const { tileCount, lonLatToTile } = require("../lib/tiles");

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

test("dateline and poles always return valid XYZ indices", () => {
  assert.deepStrictEqual(lonLatToTile(180, 90, 2), { x: 3, y: 0 });
  assert.deepStrictEqual(lonLatToTile(-180, -90, 2), { x: 0, y: 3 });
  for (const z of [0, 1, 10, 24]) {
    for (const lat of [-90, -85.05112878, 0, 85.05112878, 90]) {
      for (const lon of [-180, 0, 180]) {
        const {x, y} = lonLatToTile(lon, lat, z);
        assert.ok(x >= 0 && x < 2 ** z && y >= 0 && y < 2 ** z);
      }
    }
  }
});
test("invalid coordinates and zooms fail explicitly", () => {
  for (const zoom of [-1, 1.5, 25, NaN, Infinity, "2"]) {
    assert.throws(() => tileCount(zoom), RangeError);
    assert.throws(() => lonLatToTile(0, 0, zoom), RangeError);
  }
  for (const [lon, lat] of [[NaN, 0], [181, 0], [0, 91], [0, Infinity], ["0", 0]]) {
    assert.throws(() => lonLatToTile(lon, lat, 1), RangeError);
  }
});
