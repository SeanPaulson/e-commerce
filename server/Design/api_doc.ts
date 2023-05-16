const swaggerJsdoc = require('swagger-jsdoc');


export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./routes*.js'], // files containing annotations as above
};
    
// waggerJsdoc(options);

