const express = require('express')
const app = express();
const router = express.Router();

router.get ('/',(req,res)=>{
    res.send('url is running');
})

app.use('/router')


app.listen(3000,()=>{
    console.log("http://localhost:3000");
});
