const express = require("express");
const app = express();

const shortUrl = require("./models/shortUrl");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/urlShortener", {});
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await shortUrl.find();

  res.render("index", { shortUrls: shortUrls });
});


app.post("/shortUrls", async (req, res) => {
  // res.render('index')
  console.log(req.body)
  await shortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get('/:shortUrl',async (req,res)=>{
    const code = await shortUrl.findOne({short: req.params.shortUrl})

    if(!code)
    return res.status(404).sendStatus(404)
console.log(code)
    code.clicks++;
    code.save()
    res.redirect(code.full)
})

app.listen(process.env.PORT || 3000);
