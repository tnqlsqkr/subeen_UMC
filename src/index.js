import express from 'express'

const app = express();
const port = 3000;

app.get('/', (req,res)=>{
    res.send('Hello World!')
});

app.get('/hello',(req,res)=> {
    res.send("hi, nice to meet you");
})
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});