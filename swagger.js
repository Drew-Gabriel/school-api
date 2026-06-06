const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'School API',
    description: 'Students and Courses CRUD API'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);