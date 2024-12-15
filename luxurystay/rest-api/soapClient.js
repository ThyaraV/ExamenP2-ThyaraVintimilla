const soap = require('soap');

const url = 'http://localhost:8085/ws?wsdl';

async function checkAvailability(roomType, startDate, endDate) {
  const args = { startDate, endDate, roomType };

  try {
    const client = await soap.createClientAsync(url);
    const [result] = await client.CheckAvailabilityAsync(args);

    console.log('Respuesta del Servicio SOAP:', JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error('Error al consumir el servicio SOAP:', error.message);
    throw new Error('Error al consultar disponibilidad de habitaciones.');
  }
}

module.exports = { checkAvailability };
