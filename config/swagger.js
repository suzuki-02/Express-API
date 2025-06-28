// swagger/swaggerSpec.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'API documentation for the Auth system',
    },
    servers: [
      {
        url: 'http://localhost:5500/api/v1',
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js', './models/*.js'], // update as needed
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
