import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;  
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized", authenticated: false });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (err) {
    console.log("Error in protected route", err.message);
    res.status(500).json({ message: err.message, authenticated: false });
  }
};

const protectRouteForAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;  
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized", authenticated: false });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if(user.role!="admin"){
      return res.status(401).json({message:"Unauthorized"});
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Error in protected route", err.message);
    res.status(500).json({ message: err.message, authenticated: false });
  }
};

export default protectRoute;
export {protectRouteForAdmin};
