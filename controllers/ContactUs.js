const generateEmailBody=require("../utils/generateEmailBody.js")
const mailSender=require("../utils/mailSender.js")


exports.contactUs= async (req, res) => {
    try {
        console.log("Received Request Data:", req.body);

        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const mailBody = generateEmailBody({ name, email, message });
        await mailSender("localmart222@gmail.com", "Contact Us Form", mailBody);

        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Contact Us Controller Error:", error);
        res.status(500).json({ success: false, message: "Failed to send Contact Us Form" });
    }
};
