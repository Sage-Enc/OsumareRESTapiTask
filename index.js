const express = require('express');
const app = express();
app.use(express.json());
const fs = require("fs");
const mm = require("moment");
const port = 3000;
const tasks = require("./task.js");

// writeFile Funtion Write An Array To File
const writeFile = ()=>{
    fs.writeFileSync("./task.js", `module.exports = ${JSON.stringify(tasks)}`)
} 

// generateId Function Generates A Random ID
const generateId = (len) =>{
    const result = "";
    const chars = "0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    const charLen = chars.length;
    for(let i=0; i<len; i++){
        result += chars.charAt(Math.floor(Math.random()*charLen))
    }
    return result;
}



app.get("/", (req,res)=>{
    res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})