const express=require("express");
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config();
require('./models/db')
const AuthRouter=require('./routes/AuthRouter');
const productRouter=require('./routes/productRouter')
const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("hello bharath here");
})


app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);
app.use('/products',productRouter);

app.listen(PORT,()=>{
    console.log("server started")
})