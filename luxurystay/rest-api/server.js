// rest-api/server.js
const express = require('express');
const { Reservation } = require('./db');
const { checkAvailability } = require('./soapClient');

const app = express();
app.use(express.json());

app.post('/reservations', async (req, res) => {
  const { customer_name, start_date, end_date, room_type } = req.body;

  try {
    // Verificar disponibilidad
    const result = await checkAvailability(room_type, start_date, end_date);

    // Validar la estructura de la respuesta SOAP
    if (!result || !result.rooms || !result.rooms.room) {
      return res.status(400).json({ error: 'No hay habitaciones disponibles.' });
    }

    const availableRooms = Array.isArray(result.rooms.room)
      ? result.rooms.room
      : [result.rooms.room]; // Asegurar que sea un array

    if (availableRooms.length === 0) {
      return res.status(400).json({ error: 'No hay habitaciones disponibles.' });
    }

    // Tomar la primera habitación disponible
    const room = availableRooms[0];

    // Guardar la reserva
    const reservation = await Reservation.create({
      room_number: room.roomId,
      customer_name,
      start_date,
      end_date,
      status: 'activa'
    });

    res.json(reservation);
  } catch (error) {
    console.error('Error en la creación de la reserva:', error.message);
    res.status(500).json({ error: 'Error al crear la reserva.' });
  }
});


// Consultar Reserva: GET /reservations/:id
app.get('/reservations/:id', async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }
  res.json(reservation);
});

// Cancelar Reserva: DELETE /reservations/:id
app.delete('/reservations/:id', async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }
  await reservation.destroy();
  res.json({ message: 'Reserva cancelada exitosamente.' });
});

app.listen(8086, () => {
  console.log('REST API listening on port 8086');
});
