const express = require('express');
const searchRouter = require('./routes/searchRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', searchRouter);

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Process started on port ${port}.`);
