const User = require("../models/User")


exports.referCode = async (req, res) => {
    try {
        console.log("Entered referCode function");

        const { refer } = req.body;

        // Input validation
        if (!refer) {
            return res.status(400).json({
                success: false,
                message: "Refer code is missing in the request body",
            });
        }

        const user = await User.findOne({ referralCode: refer });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found with the provided refer code",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Error in referCode function:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
