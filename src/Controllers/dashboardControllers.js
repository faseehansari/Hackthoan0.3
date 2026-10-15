import User from "../Modules/User.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("name");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      user: {
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
