const mongoose=require('mongoose');

async function main(url){
    try{
        await mongoose.connect(url);
        console.log("DATABASE CONNECTED");
    }
    catch(err){
        console.log("DB CONNECTION FAILED");
    }
}

module.exports={
    main,
}