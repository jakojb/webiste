// pages/api/getData.js

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const data = await loadData();
    const formattedData = data.map(({ id, user, data }) => ({ id, user, data }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
