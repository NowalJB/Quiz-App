const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../model/ProfileModel");

// Create new user
async function createUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: encryptPassword,
    });
    await user.save();

    const profile = new Profile({
      user: user._id,
      bio: "",
      profilePicture: "",
      skills: [],
      github: "",
      linkedin: "",
      portfolioUrl: "",
    });
    await profile.save();

    res.status(201).json({ message: "User Created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Login user
async function loginHandleController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User with this email does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login Successful", accessToken: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get all users
async function getUserListController(req, res) {
  try {
    const users = await User.find().select("-password"); // hide passwords
    res.status(200).json({ message: "User List", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Update logged-in user's profile
async function updateProfileMeController(req, res) {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile Updated", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get logged-in user's profile
async function viewMyProfileController(req, res) {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ user: userId }).populate("user", "name email role");
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get any user's profile by ID
async function viewProfileofUserController(req, res) {
  try {
    const userId = req.params.id;

    const profile = await Profile.findOne({ user: userId }).populate("user", "name email role");
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createUserController,
  loginHandleController,
  getUserListController,
  updateProfileMeController,
  viewMyProfileController,
  viewProfileofUserController,
};
