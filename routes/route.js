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
           return res.send('Unauthorized!')
        }
        console.log("aesPass: "+aesPass)

        const encrypted = await CryptoJS.AES.encrypt(data, aesPass);
        console.log(encrypted.toString())
        return res.send(encrypted.toString())
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
           return res.send('Unauthorized!')
        }
        console.log("aes: "+ aesPass)
        const decrypted=await CryptoJS.AES.decrypt(data,aesPass).toString(CryptoJS.enc.Utf8)
        
        console.log(decrypted.toString())
        return res.send(decrypted.toString())
    }
    catch(err){
        console.error(err.message);
        res.status(500).send();
    }
})

module.exports = router;
