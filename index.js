const express = require('express');
const searchRouter = require('./routes/searchRoutes');
require('dotenv').config();
const { getNewConnectionObject } = require('./connection');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', searchRouter);
app.use('/', (req, res) => {
	res.status(200).json({ message: 'Welcome to the AAOK API!' });
});

const connection = getNewConnectionObject();
connection.connect(err => {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to database.');
	}
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Process started on port ${port}.`));
