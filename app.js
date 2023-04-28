const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);


app.use(express.json());
mongoose.connect("mongodb+srv://list1:root@cluster5.jimvqz6.mongodb.net/test",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err) =>{
    if(!err){
        console.log("connected");
    }else{
        console.log("error");
    }
}
);

//Schema
const sch = {
     District:String,
     CollegeName:String,
     CollegeCodeId:String
}
const monmodel = mongoose.model("newcollection",sch);

//POST

app.post("/post", async(req,res) => {
    console.log("inside the PORT");

    const data = new monmodel({
        District:req.body.District,
        CollegeName:req.body.CollegeName,
        CollegeCodeId:req.body.CollegeCodeId
    });
    

    const val = await data.save();
   // res.json(val);
   res.send("posted");
});


// PUT(UPDATE)

app.put("/update/:District", async(req,res)=>{

    let upDistrict = req.params.District;
    let upCollegeName = req.body.CollegeName;
    let upCollegeCodeId = req.body.CollegeCodeId;

    monmodel.findOneAndUpdate({District:upDistrict},{$set:{CollegeName:upCollegeName,CollegeCodeId:upCollegeCodeId}},
        {new:true},(err,data) => {
           
           if(err){
            console.log("error");
           } else {
                   
            if (data==null) {
                res.send("not found")
            } else {
                res.send("data")
            }
        }
        });
});


//FETCH(GET)

app.get("/fetch/:District", function(req,res){

    fetchDistrict = req.params.District;
    monmodel.find(({District : fetchDistrict}),function(err,val){
       if(err){
        console.log("error")
       }else{

       if(val){
        res.send(val);
       }else{
        res.send("no data")
       }
     }
   })
 });

app.listen(4000,() => {
    console.log("on port 4000");
});