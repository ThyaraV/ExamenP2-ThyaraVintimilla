// inventory-service/server.js
const express = require('express');
const { Room } = require('./db');

const app = express();
app.use(express.json());

// Registrar Habitación: POST /rooms
app.post('/rooms', async (req, res) => {
  const { room_id, room_number, room_type, status } = req.body;
  
  const exists = await Room.findByPk(room_id);
  if (exists) {
    return res.status(400).json({ error: 'La habitación ya existe.' });
  }

  const room = await Room.create({ room_id, room_number, room_type, status });
  res.json(room);
});

// Actualizar Estado de Habitación: PATCH /rooms/:id
app.patch('/rooms/:id', async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) {
    return res.status(404).json({ error: 'Habitación no encontrada.' });
  }

  const { status } = req.body;
  room.status = status || room.status;
  await room.save();

  res.json(room);
});

app.listen(8087, () => {
  console.log('Inventory Service listening on port 8087');
});
