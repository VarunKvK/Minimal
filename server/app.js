require("dotenv").config()
const express=require("express");
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const mongoose=require("mongoose")

const app=express()

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
const task=require("./routes/task")
const home=require("./routes/home")
const edit=require("./routes/editTask")
const taskDelete=require("./routes/taskDelete")
const logout=require("./routes/logout")

//Database Connection
mongoose.connect(process.env.MONGOOSE_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(home)
app.use(register)
app.use(login)
app.use(task)
app.use(edit)
app.use(taskDelete)
app.use(logout)


app.listen(Port,()=>{
    console.log(`Server Running on ${Port}`)
})
