// Web Mercator (XYZ) tile helpers. Longitude +180 maps to the final tile.
const MAX_LATITUDE = 85.0511287798066;
function validateZoom(zoom) {
  if (!Number.isInteger(zoom) || zoom < 0 || zoom > 24) {
    throw new RangeError('zoom must be an integer from 0 to 24');
  }
}
function tileCount(zoom) {
  validateZoom(zoom);
  return 4 ** zoom;
}
function lonLatToTile(lon, lat, zoom) {
  validateZoom(zoom);
  if (!Number.isFinite(lon) || !Number.isFinite(lat) || lon < -180 || lon > 180 || lat < -90 || lat > 90) {
    throw new RangeError('expected finite WGS84 longitude [-180,180] and latitude [-90,90]');
  }
  const n = 2 ** zoom;
  const clampedLat = Math.max(-MAX_LATITUDE, Math.min(MAX_LATITUDE, lat));
  const latRad = (clampedLat * Math.PI) / 180;
  const clampIndex = value => Math.max(0, Math.min(n - 1, Math.floor(value)));
  return {
    x: clampIndex(((lon + 180) / 360) * n),
    y: clampIndex(((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n),
  };
}
module.exports = { tileCount, lonLatToTile };
