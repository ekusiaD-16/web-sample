const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb+srv://19sakaguchi:guchi1016@cluster0.qoeqsjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Diary";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const Schema = mongoose.Schema;
const DiaryModelSchema = new Schema({
    date: {type:String, unique:true, required:true } ,
    toilet: Array(2),
    bodyTemp: Number,
    memo: String,
});

const DiaryModel = mongoose.model('diaries', DiaryModelSchema);

app.get('', async (req,res) => {
    res.send("<h1>hello, wowrld!</h1>");
});

app.get('/api/diaries', async (req, res) => {
    const diaries = await DiaryModel.find();
    res.send(diaries);
});

app.post('/api/diaries', async (req, res) => {
    const newItem = new DiaryModel(req.body);
    await newItem.save();
    res.send(newItem);
});

mongoose.connect(uri,clientOptions).then( ()=>{
    console.log("connected mongoDB");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

