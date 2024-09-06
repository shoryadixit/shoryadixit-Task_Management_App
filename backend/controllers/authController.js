import generateAccessToken, { decryptToken } from "../utils/index.js";

export const loginController = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: "Please provide email and name" });
  }
  const token = generateAccessToken({ email, name });
  if (token)
    return res
      .status(200)
      .json({ message: "Login Successful", user: { email, name, token } });
  else return res.status(400).json({ error: "Invalid username or password" });
};

export const logoutController = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ error: "Error in logout." });
  }
  try {
    if (decryptToken(token)) {
      return res.status(200).json({ message: "Logout successful" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Error logging out" });
  }
};
