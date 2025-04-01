 const mongoose = require("mongoose");
const validator=require('validator')

 const userSchema = new mongoose.Schema(
	{
 		firstName: {
			type: String,
			required: [true,"Please Enter your first name"],
			trim: true,
		},
		lastName: {
			type: String,
			required: [true,"Please Enter your last name"],
			trim: true, 
		},
 		email: {
			type: String,
			required: [true, "Please enter your Email"],
            validate:[validator.isEmail,"Please Enter valid email"],
            unique:true,
			trim: true,
		},

 		password: {
			type: String,
			required: [true, "Please enter your Password"],
		},
 		accountType: {
			type: String,
			enum: ["Admin", "Student", "Instructor"],
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		approved: {
			type: Boolean,
			default: true,
		},
		additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
		courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
		token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
		image: {
			type: String,
			required: true,
		},
		courseProgress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "courseProgress",
			},
		],

	},
    // Add timestamps for when the document is created and last modified
	{ timestamps: true }
);

 module.exports = mongoose.model("user", userSchema);