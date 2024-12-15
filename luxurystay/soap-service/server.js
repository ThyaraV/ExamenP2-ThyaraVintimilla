const http = require('http');
const soap = require('soap');
const fs = require('fs');
const { Availability } = require('./db'); // Modelo de base de datos
const moment = require('moment');
const { Op } = require('sequelize');

const wsdl = fs.readFileSync('availability.wsdl', 'utf8');

const service = {
  AvailabilityService: {
    AvailabilityPort: {
      CheckAvailability: async function (args) {
        console.log('Solicitud recibida:', args);
        const { startDate, endDate, roomType } = args;

        try {
          // Consulta a la base de datos para obtener habitaciones disponibles
          const availableRooms = await Availability.findAll({
            where: {
              room_type: roomType,
              available_date: { 
                [Op.between]: [startDate, endDate] // Corregido el uso de between
              },
              status: 'disponible'
            }
          });

          // Construir la respuesta en formato JavaScript
          const rooms = availableRooms.map(room => ({
            roomId: room.room_id,
            roomType: room.room_type,
            availableDate: moment(room.available_date).format('YYYY-MM-DD'),
            status: room.status
          }));

          // Estructura conforme al WSDL
          return {
            rooms: {
              room: rooms
            }
          };

        } catch (error) {
          console.error('Error en el servicio SOAP:', error.message);
          return {
            rooms: {
              room: [] // Devolver una respuesta vacía si hay un error
            }
          };
        }
      }
    }
  }
};

// Crear y configurar el servidor HTTP
const server = http.createServer((req, res) => {
  res.end('Servicio SOAP de disponibilidad');
});

server.listen(8085, () => {
  console.log('SOAP Service listening on port 8085');
  soap.listen(server, '/ws', service, wsdl);
});
