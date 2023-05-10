const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js REST API with MongoDB and Express',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      }
    },
    schemas: {
      track: {
        type: 'object',
        required: ['name', 'album', 'cover', 'artist', 'duration', 'mediaId'],
        properties: {
          name: {
            type: 'string',
          },
          album: {
            type: 'string',
          }, 
          cover: {
            type: 'string',
          },
          artist: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              nickname: {
                type: 'string',
              },
              nationality: {
                type: 'string',
              }
            }
          },
          duration: {
            type: 'object',
            properties: {
              start: {
                type: 'number',
              },
              end: {
                type: 'number',
              }
            }
          },
          mediaId: {
            type: 'string',
          }
        }
      },
      storage: {
        type: 'object',
        required: ['url', 'fileName'],
        properties: {
          url: {
            type: 'string',
          },
          fileName: {
            type: 'string',
          },
        }
      },
      login: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          }
        }
      },
      register: {
        type: 'object',
        required: ['name', 'age', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
          },
          age: {
            type: 'number',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
}

const openApiConfiguration = swaggerJsdoc(options);

module.exports = openApiConfiguration;