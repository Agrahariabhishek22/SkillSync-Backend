const express=require('express');
const app=express();
const userRoutes=require('./routes/User');
const profileRoutes=require('./routes/Profile')
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/ContactUsRoute");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


dotenv.config();
const PORT=process.env.PORT||4000;

// databse connect
database.connect();
// middlewares
// Parses incoming JSON requests
app.use(express.json());
// Parses cookies from requests
app.use(cookieParser());

// jo b hi request frontend se a raha unhe accept kro
app.use(
  cors({
    origin: ["http://localhost:5173", "https://skill-sync-frontend.vercel.app"],
    credentials: true,
  })
);

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

// routes
app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/payment',paymentRoutes);
app.use('/api/v1',contactUsRoute);

app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
})

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
    
})
