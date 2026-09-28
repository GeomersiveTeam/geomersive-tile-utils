// Web Mercator (XYZ) tile helpers used by the Geomersive viewer.

// Number of tiles covering the world at a zoom level.
function tileCount(zoom) {
  return 4 ** zoom;
}

// Tile x/y containing a longitude/latitude at a zoom level.
function lonLatToTile(lon, lat, zoom) {
  const n = 2 ** zoom;
  const x = Math.floor(((lon + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);
  return { x, y };
}

// Longitude of a tile's west edge.
function tileToLon(x, zoom) {
  return (x / 2 ** zoom) * 360 - 180;
}

// Latitude of a tile's north edge.
function tileToLat(y, zoom) {
  const n = Math.PI - (2 * Math.PI * y) / 2 ** zoom;
  return (180 / Math.PI) * Math.atan(Math.sinh(n));
}

// Bounding box of a tile in degrees.
function tileBounds(x, y, zoom) {
  return [tileToLon(x, zoom), tileToLat(y, zoom), tileToLon(x + 1, zoom), tileToLat(y + 1, zoom)];
}

module.exports = { tileCount, lonLatToTile, tileBounds };
