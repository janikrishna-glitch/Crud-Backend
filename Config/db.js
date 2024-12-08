

const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://janikrishna918:123456789krishna@cluster0.5ekmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0*")



const db = mongoose.connection;

db.on("connected",()=>{
    console.log("databess connect")

})