const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
main().then(()=>{
    console.log("connected to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



app.get("/",(req,res)=>{
    console.log("server is running");
    res.send("server is running");
});


app.get("/testlisting", async(req,res)=>{
    let sampleListing = new Listing({
        title: "My new villa",
        description:"By the beach",
        price:1200,
        location:"Calangute, Goa",
        country:"India"
    });

    await sampleListing.save().then((res)=> {console.log(res);}).catch((err)=> {console.log(err);})
    res.send("successful testing");
});



app.listen(8080,()=>{
    console.log(`port is running on 8080`);
})