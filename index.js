import { createRequire } from "module";
import path from 'path';
import { fileURLToPath } from 'url';
import {v4 as uuidv4} from 'uuid';


const require = createRequire(import.meta.url);
const express = require('express');
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine' , 'ejs');
app.set('views',path.join(__dirname, 'views'));


let myuuid = uuidv4();
const comments = [
    {   
        id: myuuid,
        username: 'Sean',
        comment: 'hihiihihihh'
    },
    {
        id: myuuid,
        username: 'Chang',
        comment: 'LOLOLOLO'
    },
    {
        id: myuuid,
        username: 'CHIH',
        comment: 'nonoononononoo'
    },{
        id: myuuid ,
        username: 'HSIN',
        comment: 'watashi5'
    }
]


app.get('/coments', (req, res) => {
    res.render('comments/index', {comments});
})
app.listen(3000, ()=>{
    console.log('hihi');
})
app.get('/coments/new', (req,res)=>{ 
    res.render('comments/new')
})
app.post('/coments',(req,res)=>{
    const {username, comment} = req.body;
    comments.push({ id:myuuid, username, comment});
    res.redirect('/coments');
    // res.send('Post from new!');
})
app.get('/coments/:id',(req,res) =>{
    const {id} = req.params;
    const cid = comments.find(c => c.id === id);
    res.render('comments/show', {cid});

})
app.get('/coments/:id/edit',(req,res)=>{
    const {id} = req.params;
    const cid = comments.find(c => c.id === id);
    res.render('comments/edit', {cid});
})
app.patch('/coments/:id',(req,res)=>{
    const {id} = req.params;
    let newComment = req.body.comment;
    
    const cid = comments.find(c => c.id === id);
    cid.comment = newComment;
    res.redirect('/coments')
})
app.get('/tacos',(req,res)=>{
    res.send('GET /tacos response');
})

app.post('/tacos', (req,res)=>{
    const {meat, qty} = req.body;
    res.send(`Your ${meat} num:${qty}`);
})