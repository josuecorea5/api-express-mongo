const express = require('express');
const cors = require('cors');
const mongoDBConnection = require('./config/mongo');
require('dotenv').config();
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('storage'));

app.use('/api/v1', require('./routes'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoDBConnection();