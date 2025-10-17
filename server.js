const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Route = require('./models/routeModel');

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Koneksi MongoDB
mongoose.connect(process.env.MONGO_GEO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

mongoose.connection.on('error', (err) => {
  console.error('⚠️ Mongoose error event:', err);
});

// 📝 CREATE
app.post('/api/routes', async (req, res) => {
  try {
    const newRoute = await Route.create(req.body);
    res.status(201).json(newRoute);
  } catch (err) {
    console.error('Error creating route:', err);
    res.status(400).json({ message: err.message });
  }
});

// 📜 READ ALL
app.get('/api/routes', async (req, res) => {
  try {
    const routes = await Route.find().sort({ createdAt: -1 });
    res.json(routes);
  } catch (err) {
    console.error('Error fetching routes:', err);
    res.status(500).json({ message: 'Error fetching routes', error: err.message });
  }
});

// 🔍 READ BY ID
app.get('/api/routes/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Data tidak ditemukan' });

    res.json(route);
  } catch (err) {
    console.error('Error fetching route by ID:', err);
    res.status(500).json({ message: 'Error fetching route', error: err.message });
  }
});

// ✏️ UPDATE
app.put('/api/routes/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const updated = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Data tidak ditemukan' });

    res.json(updated);
  } catch (err) {
    console.error('Error updating route:', err);
    res.status(500).json({ message: 'Error updating route', error: err.message });
  }
});

// 🗑️ DELETE
app.delete('/api/routes/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const deleted = await Route.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Data tidak ditemukan' });

    res.json({ message: '✅ Data berhasil dihapus' });
  } catch (err) {
    console.error('Error deleting route:', err);
    res.status(500).json({ message: 'Error deleting route', error: err.message });
  }
});

// 🟢 ROOT CHECK
app.get('/', (req, res) => {
  res.send('🌍 GeoJSON API aktif');
});

// 🚀 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
