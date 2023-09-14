require("dotenv").config()
const express=require("express");
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const session = require('express-session');
const mongoose=require("mongoose")

const app=express()
app.use(session({
  secret: 'yoursecretkey',
  resave: false,
  saveUninitialized: false,
}));

const corsOptions = {
    origin:true,
    credentials: true
  };
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

const Port=process.env.PORT

const register=require("./routes/register")
const login=require("./routes/login")

//Database Connection
mongoose.connect(process.env.MONGOOSE_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(register)
app.use(login)

app.listen(Port,()=>{
    console.log(`Server Running on ${Port}`)
})
