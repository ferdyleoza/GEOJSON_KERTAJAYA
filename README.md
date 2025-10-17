# GeoJSON Desa Kertajaya, Padalarang

Repositori ini berisi data **GeoJSON** yang merepresentasikan beberapa ruas jalan di Desa Kertajaya, Kecamatan Padalarang, Kabupaten Bandung Barat.

## 🗺️ Data
File utama:
- `data/jalan_kertajaya.geojson`

Berisi 3 jalur jalan:
1. Jalan Raya Padalarang — jalan utama sepanjang 2 km.
2. Jalan Panaris — jalan perumahan RT 03 RW 06, panjang 0.5 km.
3. Jalan Raya Purwakarta — jalan menuju arah Purwakarta.

## 🔍 Format
Data disimpan dalam format **GeoJSON (FeatureCollection)** yang dapat divisualisasikan di:
[geojson.io](https://geojson.io)

## 💾 Penyimpanan
Data ini juga dapat disimpan di MongoDB menggunakan `insertOne()` pada koleksi `geojson`:

```js
db.geojson.insertOne({
  "type": "FeatureCollection",
  "features": [ ... ]
})
