const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001; // Port 3000 (gleich wie Next.js-Server)

app.use(cors());
app.use(bodyParser.json());

app.post('/api/saveData', async (req, res) => {
  try {
    const { user, data } = req.body;
    if (!user || !data) {
      return res.status(400).json({ success: false, error: 'User and data are required.' });
    }

    const existingData = await loadData();
    const newData = { id: generateId(user), user, data };

    existingData.push(newData);
    await saveData(existingData);

    res.status(200).json({ success: true, id: newData.id });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/getData', async (req, res) => {
  try {
    const data = await loadData();
    const formattedData = data.map(({ id, user, data }) => ({ id, user, data }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error loading data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function loadData() {
  try {
    const rawData = await fs.readFile(path.join(process.cwd(), 'data.json'), 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading data file:', error);
    return [];
  }
}

async function saveData(data) {
  try {
    await fs.writeFile(path.join(process.cwd(), 'data.json'), JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data file:', error);
  }
}

function generateId(user) {
  return `${user}_${Date.now()}`;
}
