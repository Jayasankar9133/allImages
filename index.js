const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const path = require('path');



const dbPath = path.join(__dirname, "images.db");
const app = express();
app.use(express.json());
app.use(cors());

let db = null;

let port = process.port | 3600;

let dbConnection = async () => {

    db = await open({
        filename: dbPath,
        driver: sqlite3.Database

    });
    app.listen(port, () => {
        console.log("server Running at https://localhost:3600/");
    });

};


dbConnection();



let date = new Date();

app.get("/date/", (req, res) => {
    res.send(`Today Date is ${date}`);
});

app.get("/images/",async(req,res)=>{
    const query = `select * from images;`;
    const array = await db.all(query);
    res.send(array);  
});