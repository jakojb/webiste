// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

app.post('/api/saveData', async (req, res) => {
  try {
    const { user, data } = req.body;
    const existingData = await loadData();
    const newData = { id: generateId(user), data };

    existingData.push(newData);
    await saveData(existingData);

    res.status(200).json({ success: true, id: newData.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/getData', async (req, res) => {
  try {
    const data = await loadData();
    const formattedData = data.map(({ id, data }) => ({ data, id }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Restlicher Server-Code...



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function loadData() {
  try {
    const rawData = await fs.readFile('data.json', 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    return [];
  }
}

async function saveData(data) {
  await fs.writeFile('data.json', JSON.stringify(data, null, 2));
}

function generateId(user) {
  return `${user}_${Date.now()}`;
}
