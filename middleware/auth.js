import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error: " + error });
  }
}

export default authMiddleware;