const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Route = require('./models/routeModel');

dotenv.config();

mongoose.connect(process.env.MONGO_GEO)
  .then(async () => {
    console.log('✅ Connected to MongoDB for seeding');

    // Data GeoJSON Desa Kertajaya (Padalarang)
    const data = [
      {
        name: 'Jalan Raya Padalarang',
        geojson: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [107.48887250482935, -6.836392269342519],
              [107.49405014400357, -6.840058010784609],
              [107.49806393227837, -6.844202857758507],
              [107.49707717179177, -6.851264162449696]
            ]
          },
          properties: {
            type: 'main road',
            length: '2 km',
            description: 'Jalan utama di Desa Kertajaya'
          }
        }
      },
      {
        name: 'Jalan Panaris',
        geojson: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [107.48506953723994, -6.842455356562739],
              [107.48882849937482, -6.836465667537886]
            ]
          },
          properties: {
            type: 'residential',
            length: '0.5 km',
            description: 'Jalan perumahan di RT 03 RW 06'
          }
        }
      },
      {
        name: 'Jalan Raya Purwakarta',
        geojson: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [107.48493807770994, -6.8429130635358515],
              [107.49544644659964, -6.850338328393615],
              [107.49702677750537, -6.851361319632745]
            ]
          },
          properties: {
            type: 'highway',
            length: '1.5 km',
            description: 'Jalan menuju Purwakarta'
          }
        }
      }
    ];

    // Hapus data lama lalu masukkan data baru
    await Route.deleteMany();
    await Route.insertMany(data);

    console.log('🌱 Data Desa Kertajaya berhasil dimasukkan ke MongoDB');
    mongoose.connection.close();
  })
  .catch(err => console.error('❌ Error:', err));
