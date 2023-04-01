const swaggerJsdoc = require('swagger-jsdoc');


const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'E-commerce',
          version: '1.0.0',
        },
      },
      apis: ['./routes/*.ts'],
    };
    
export const openapiSpecification = swaggerJsdoc(options);

