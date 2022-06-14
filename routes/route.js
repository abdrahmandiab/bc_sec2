const express = require('express');
const router = express.Router();
var db = require( '../DB.js');
var CryptoJS = require("crypto-js")


router.post('/encrypt', async (req,res)=>{
    try{
        const user = req.body.user 
        const password = req.body.password
        const data = req.body.data
        let aesPass = ""
        for(let i = 0; i<db.length; i++){
            if (db[i].id == user){
                if(db[i].pass == password){
                    aesPass = db[i].AES_KEY
                    break;
                }
            }
        }
        if (aesPass ==""){
           return res.json('Unauthorized!')
        }
        console.log("aesPass: "+aesPass)

        const encrypted = await CryptoJS.AES.encrypt(data, aesPass);
        console.log(encrypted.toString())
        return res.json({"encrypted" : encrypted.toString()})
    }
    catch(err){
        console.error(err);
        res.status(500).send();
    }
})

router.post('/decrypt', async (req,res)=>{
    try{
        const user = req.body.user 
        const password = req.body.password
        const data = req.body.data
        let aesPass = ""
        for(let i = 0; i<db.length; i++){
            if (db[i].id == user){
                if(db[i].pass == password){
                    aesPass = db[i].AES_KEY
                    break;
                }
            }
        }
        if (aesPass ==""){
           return res.json('Unauthorized!')
        }
        console.log("aes: "+ aesPass)
        const decrypted=await CryptoJS.AES.decrypt(data,aesPass).toString(CryptoJS.enc.Utf8)
        
        console.log(decrypted.toString())
        return res.json({"decrypted":decrypted.toString()})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send();
    }
})


router.post('/decrypt-many', async (req,res)=>{
    try{
        const user = req.body.user 
        const password = req.body.password
        const data = req.body.data
        
        let aesPass = ""
        for(let i = 0; i<db.length; i++){
            if (db[i].id == user){
                if(db[i].pass == password){
                    aesPass = db[i].AES_KEY
                    break;
                }
            }
        }
        if (aesPass ==""){
           return res.json('Unauthorized!')
        }
        console.log("aes: "+ aesPass)
        let decrypted = []
        const data_in = JSON.parse(data).enc_data
        console.log("D_in: "+ data_in)
        for(let i =0; i<data_in.length; i+=1){
           const dec= await CryptoJS.AES.decrypt(data_in[i],aesPass).toString(CryptoJS.enc.Utf8)
           decrypted.push(dec);
        }
        
        console.log(decrypted)
        return res.json({"decrypted":decrypted})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send();
    }
})


module.exports = router;
