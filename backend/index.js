const express = require("express")
const dotenv = require("dotenv")
const app = express()
const mongoose = require("mongoose")
const { route } = require("./routes/auth")
const router = require("./routes/auth")
const auth = require("./routes/auth");
const list = require("./routes/list");
const cors = require("cors")

app.use(express.json())
app.use(cors());
dotenv.config();

mongoose.connect(process.env.DB_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log(err));

app.get("/",(req,res)=>{
    res.send("SanjanaReddy")
})

app.use('/api/v1',auth);
app.use('/api/v2',list);

const port=3001
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})