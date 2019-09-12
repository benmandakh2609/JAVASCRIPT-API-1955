////////// EXPRESS ///////////////////////////////////
const express = require("express");
const app = express();

////////// MONGOOSE //////////////////////////////////
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apiDB', {useNewUrlParser: true});
const PeopleSchema = new mongoose.Schema({
 name: {type: String, required:true, minlength:2},
}, {timestamps:true});
const People = mongoose.model('People', PeopleSchema);

////////// CONFIGURE  ////////////////////////////////
const bodyParser = require("body-parser");
app.use(bodyParser.json());
mongoose.set('useUnifiedTopology', true);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

///////// EXPRESS CONNECTION PORT ////////////////////
app.listen(8000, () => console.log("listening on port 8000"));

//////// INDEX GET ROUTE /////////////////////////////
app.get('/', (req, res) => {
    People.find()
        .then(people => res.json(people))
        .catch(err => res.json(err));
});
//////// ADD GET ROUTE   /////////////////////////////
app.post('/new/:name', (req, res) => {
    const people = new People();
    people.name = req.params.name;
    people.save()
        .then(() => res.redirect('/'))
        .catch(err => res.json(err));
});
//////// REMOVE GET ROUTE ////////////////////////////
app.delete('/remove/:name', (req, res) => {
    People.remove({ name:req.params.name}, function(err, person){
        if(err){
            res.json(err);
        }else{
            res.josn({removed:true});
        }
    })
});
//////// DETAILS GET ROUTE ///////////////////////////
app.get('/:name', (req, res) => {
    People.findOne({ name:req.params.name}, function(err, person){
        if(err){
            res.json(err);
        }else{
            res.josn(person);
        }
    })
});





