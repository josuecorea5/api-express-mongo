const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const openApiConfiguration = require('./docs/swagger');
require('dotenv').config();
const mongoDBConnection = require('./config/mongo');
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('storage'));

app.use('/api/v1', require('./routes'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiConfiguration));

const PORT = process.env.PORT || 3001;

if(process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};


mongoDBConnection();

module.exports = app;