export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = 'GeQR86F_Q4JZ7NIx5zzsBizDrE_UpSK9'; // your NeatQueue API token
  const apiUrl = 'https://api.neatqueue.com/api/v2/player/add'; // update for other commands if needed

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
}
