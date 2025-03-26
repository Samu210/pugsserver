export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { channel_id, user_id, role, team } = req.body;

  if (!channel_id || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.neatqueue.com/api/v2/player/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'GeQR86F_q4JZ7Nk5zzsBizDrE_UpSK9',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        channel_id,
        user_id,
        role,
        team,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, result: data });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
