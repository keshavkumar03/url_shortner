import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import Path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const API_URL='https://cleanuri.com/api/v1/shorten';


app.set('views','./views');
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
res.render("index" ,{ short_url: null });
});

app.post("/submit",async(req,res)=>{
    const URL=req.body.url;
    try {
        const response= await axios.post(API_URL, { url: URL })
        const short_url=response.data.result_url;
        res.render("index",{short_url})
        
    } 
    catch (error) {
        res.status(500).json({ error: 'An error occurred while shortening the URL.' });
    }

})

app.listen(port,()=>{
    console.log(`the port is running on ${port}`)
})