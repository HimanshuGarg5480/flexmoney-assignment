import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { name, email, password, age, phone,role} = req.body;

    // Validate user input
    if (!name || !email || !password || !age || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Age validation
    if (age < 18 || age > 65) {
      return res.status(400).json({ message: "Age must be between 18 and 65" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      age,
      phone,
      role:role?role:"user"
    });

    await user.save();

    // Generate JWT token
    if (user) {
      let token = generateTokenAndSetCookie(user._id, res);

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          age: user.age,
          phone: user.phone,
          role:user.role
        },
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.log("Logout error: ", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log("getUser error: ", err.message);
    res.status(500).json({ message: err.message });
  }
};

const authCheck = async (req, res) => {
  return res.json({ authenticated: true, user: req.user });
};

export { signup, login, logout, getUser, authCheck };
