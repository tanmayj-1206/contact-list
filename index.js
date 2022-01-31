const { urlencoded } = require('express');
const express = require('express');
const db = require('./config/mongoose');
const Contact = require('./model/contact');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded())
app.use(express.static('assets'));


app.get('/', function(req, res) {
    Contact.find({}, function(err, contacts) {
        if(err)
        {
            console.log(err);
            return;
        }
        return res.render('home', {title: 'My contact list', contactList: contacts});
    })
});

app.post('/create-contact', function(req, res) {
    // Contacts.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if(err)
        {
            console.log(err);
            return;
        }
        res.redirect('back');
    });
});

app.get('/delete-contact/', function(req, res) {
    Contact.findByIdAndDelete(req.query.id, function(err) {
        if(err){
            console.log(err);
            return;
        }
    });

    return res.redirect('back');
})


app.listen(port, function(err) {
    if(err)
    {
        console.log('error');
    }

    console.log('server is running');
});