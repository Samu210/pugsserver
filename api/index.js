const { channel_id, user_id, role = '', team = 0 } = req.body;

// convert to strings just in case
if (!channel_id || !user_id) {
  return res.status(400).json({ error: 'Missing required fields' });
}

try {
  const response = await fetch('https://api.neatqueue.com/api/v2/player/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'GeQR86F_Q4JZ7NIx5zzsBizDrE_UpSK9',
    },
    body: JSON.stringify({
      channel_id: String(channel_id),
      user_id: String(user_id),
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
