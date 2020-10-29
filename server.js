const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();

app.set('view engine','ejs');

// Database
mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true, 
  useUnifiedTopology: true 
})
 .then(result => app.listen(1919))
 .catch(err => console.log(err));

// Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res) => {
  res.redirect('/all-user')
})

// All user routes
const allUser = require('./routes/allUser.js');

app.use('/all-user',allUser)

app.get('/create',(req,res) =>{
  res.render('create',{ title: 'Create new'})
})

app.post('/add-user',(req,res) =>{
  const user = new User(req.body)
  
  user.save()
    .then(result => res.redirect('/'))
    .catch(err => console.log(err))
 });
 
 
 

app.use((req,res) =>{
  res.status(404).render('404', { title: '404 PAGE' });
});

/*
db.createUser({
  user: "Mark",
  pwd: "kramdroid",
  roles: ['readWrite','dbAdmin']
})
*/
