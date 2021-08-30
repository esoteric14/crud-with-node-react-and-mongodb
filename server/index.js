const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const userModel = require("./models/users");
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://user1:12345@cluster0.7bcd1.mongodb.net/one?retryWrites=true&w=majority',{
    useNewUrlParser:true,
});

const ObjectId = require("mongodb").ObjectId;

app.post("/insert",async(req, res) =>{

    const Fullname= req.body.fname;
    const Lastname= req.body.lname;
    const Title= req.body.title;
    const Email= req.body.email;
    const Status= req.body.status;
    // console.log(req.body);
    const users = new userModel({fname:Fullname, lname:Lastname, title:Title, email:Email,status:Status});
    try{
        await users.save();
        res.send("hi");
    }
    catch(err){console.log("err");}
} )

app.put("/update/:id",async(req, res) =>{
    const obId = req.params.id;
    const upFullname= req.body.fname;
    const upLastname= req.body.lname;
    const upTitle= req.body.title;
    const upEmail= req.body.email;
    const upStatus= req.body.status;

    const upUser = userModel.findByIdAndUpdate({'_id': new ObjectId(obId)},{"$set":{fname:upFullname, lname:upLastname, title:upTitle, email:upEmail,status:upStatus}}).exec()
    try{
        await upUser.save();
        res.send("hi");
    }
    catch(err){console.log("err");}
} )


app.get("/readAll",async(req, res) =>{

    userModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
} )

app.get("/read/:id",async(req, res) =>{
    const obId = req.params.id;
    userModel.findById({'_id': new ObjectId(obId)},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
} )


app.delete("/delete/:id", async(req,res)=>{
   const id = req.params.id;
   await userModel.findByIdAndDelete(id).exec();
   res.send("item deleted");
});
  

app.listen(3001,()=>{
    console.log("server is running on port 3001");
})