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

module.exports = { tileCount, lonLatToTile };
