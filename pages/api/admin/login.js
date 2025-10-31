export default async function handler(req,res){
  const { password } = req.body;
  const adminPw = process.env.ADMIN_PASSWORD;
  if (!adminPw) return res.status(500).json({ error: 'Admin password not configured' });

  if (password === adminPw) {
    res.setHeader('Set-Cookie', `admin=true; HttpOnly; Path=/; Max-Age=${60*60*24}`);
    res.status(200).end();
  } else {
    res.status(401).end();
  }
}
