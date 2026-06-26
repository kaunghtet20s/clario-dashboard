export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' })
  // Stateless tokens — logout is handled client-side by discarding the token.
  return res.status(200).json({ message: 'Logged out.' })
}
