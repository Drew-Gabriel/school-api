const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'School API',
    description: 'Students and Courses CRUD API'
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:3000',
  schemes: process.env.RENDER_EXTERNAL_HOSTNAME ? ['https'] : ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

console.log("Swagger documentation generated");