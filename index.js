const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/config');
require('dotenv').config();

const app = express();

//DB
dbConnection();

//CORS
app.use(cors());

//Public
app.use(express.static('public'));

//JSON
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/events', require('./routes/eventsRoute'));

app.get('*', (req, res) => {
   res.sendFile(__dirname + '/public/index.html');
})

app.listen(process.env.PORT, () => {
   console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});