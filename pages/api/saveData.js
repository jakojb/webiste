// pages/api/saveData.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { user, data } = req.body;
    const existingData = await loadData();
    const newData = { id: generateId(user), user, data };

    existingData.push(newData);
    await saveData(existingData);

    res.status(200).json({ success: true, id: newData.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

async function loadData() {
  try {
    const rawData = await fs.readFile(path.join(process.cwd(), 'data.json'), 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    return [];
  }
}

async function saveData(data) {
  await fs.writeFile(path.join(process.cwd(), 'data.json'), JSON.stringify(data, null, 2));
}

function generateId(user) {
  return `${user}_${Date.now()}`;
}
