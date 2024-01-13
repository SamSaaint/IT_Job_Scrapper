const express = require("express");
const app = express();
const scrapPages = require("./scripts/scrapPages");
const sitesToScrap = require("./sitesToScrap/sitesToScrap");

app.get("/", async (req,res)=>{
    const scrappedPages = await scrapPages(sitesToScrap);
    res.json(scrappedPages);
})

app.listen(3000,()=>console.log("app running"));