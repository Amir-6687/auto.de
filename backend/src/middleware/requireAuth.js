const { getToken } = require("next-auth/jwt");

module.exports = async function requireAuth(req, res, next) {
  // اگه از طریق internal (Next.js سرور) میاد — مجاز
  const secret = req.headers["x-internal-secret"];
  if (secret && secret === process.env.INTERNAL_API_SECRET) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
};