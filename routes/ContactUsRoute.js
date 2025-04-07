const express = require("express")
const {contactUs} = require("../controllers/ContactUs.js")

const router = express.Router();

router.put("/contactUs",contactUs);

module.exports=router;

