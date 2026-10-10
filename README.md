# Geomersive tile utilities

Small public JavaScript library for Web Mercator XYZ tile indexing. This is an inspectable part of my Geomersive mapping work, not a complete tile server or terrain-processing pipeline.

## What I built and maintain

I maintain the tile-count and longitude/latitude-to-tile helpers and their tests. The boundary-handling pass makes dateline and polar inputs return valid indices, rejects invalid coordinates and zooms, and documents the contract explicitly. The broader Geomersive application remains private.

```js
const {tileCount, lonLatToTile} = require('./lib/tiles');
tileCount(10); // 1048576 total tiles worldwide, not tiles per side
lonLatToTile(10.7522, 59.9139, 10); // {x: 542, y: 297}
```

## Run

Node 22 or later; runtime and tests need no third-party dependencies:

```sh
node --test
```

Tests cover known locations, zoom growth, the antimeridian, both poles, and invalid inputs. CI runs the same suite.

## Design and limits

- XYZ scheme: origin at the northwest, y increases southward; not TMS.
- Longitude must be in [-180,180]; +180 maps to the final x tile rather than wrapping.
- Latitude must be in [-90,90] and is clamped to Web Mercator's ±85.0511287798066° limit.
- Integer zoom levels 0–24 keep index arithmetic and counts within safe integer precision.
- Inputs are WGS84 longitude then latitude. No reprojection, tile fetching, bounds enumeration, or terrain decoding is implemented here.
- `samples/tile-bbox.json` is synthetic/example input around Oslo. The current helpers return the tile containing a point, not every tile intersecting a bounding box.

[Geomersive](https://geomersive.org) · [Frederick Abalo](https://github.com/Freddie999)
