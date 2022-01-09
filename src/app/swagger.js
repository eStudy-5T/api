import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'LetMeet APIs',
    version: '1.0.0',
    description: 'This is the list of api for LetMeet application'
  },
  servers: [
    {
      url: '/'
    }
  ],
  components: {
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  },
  security: [
    {
      JWT: []
    }
  ]
};

const options = {
  definition: swaggerDefinition,
  apis: [`${__dirname}/core/*/*.js`, `${__dirname}/api-docs/*.yaml`],
  basePath: '/'
};

export const swaggerSpec = swaggerJSDoc(options);
