var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.connect("mongodb://localhost/User", { useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
var Schema = mongoose.Schema;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var newSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    details: String
})

var User = mongoose.model("User",newSchema);
app.get('/',(err,res)=>{
        res.redirect('/getting');
})

app.get('/getting',(req,res)=>{
    User.find({},(err,result)=>{
        if(err) res.json(err)
        else{
            res.json(result);
            //res.render("index",{users:result});
        }
    })
})

app.get('/getting/:id',(req,res)=>{
    User.findById(req.params.id,(err,result)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
})

app.post('/posting',(req,res)=>{
    User.create(req.body.user,(err,result)=>{ 
        if(err) res.json(err)
        else{
            res.json(result);
            //res.redirect('/');
        }
    })
})

app.get('/deleting/:id',(res,req)=>{
    User.findByIdAndDelete({_id:req.params.id},(err,result)=>{
        if(err){res.json(err);}
        else{
            res.json('Removed successfully');
        }
    })
})
/*
app.post('/deleting',(req,res)=>{
    var myquery = req.body.name ;
    User.deleteOne(myquery,(err,result)=>{
        if(err) res.json(err)
        else{
            res.redirect('/');
        }
    })
})*/

var port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening at port ${port}`)});