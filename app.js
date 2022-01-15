const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let array = [];
let workItem = [];

app.get("/", function (req, res) {
    
    let today = new Date();
    
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("hi-IN", option);

    res.render("list", {listTitle: day,newListItem:array});
});

app.post("/", function (req, res) {

    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItem.push(item);
          res.redirect("/work");
    }
    else {
        array.push(item);
          res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work Title", newListItem: workItem });
});

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItem.push(item);
    res.render("/work");
});
app.listen(process.env.PORT, function () {
    console.log("Server running on Port 3000");
});