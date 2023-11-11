const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint zum Empfangen von Formulardaten
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Formulardaten empfangen:', formData);
    res.send('Daten empfangen und verarbeitet!');
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
