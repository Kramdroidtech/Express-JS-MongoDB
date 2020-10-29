const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req,res) =>{
   try{
    const result = await User.find();
    res.render('index',{ title: 'Hone Page', users: result })
  }catch(e){
    console.log(e);
  }
});

router.get('/:id', async (req,res)=>{
  const id = req.params.id;
 
  try{
    const result = await User.findById(id);
    res.render('details',{ title: 'User Details', user: result })
  }catch(e){
    console.log(e);
  }
  
})

router.delete('/:id',(req,res) =>{
  const id = req.params.id;
  
  User.findByIdAndDelete(id)
    .then(result => res.json({redirectTo: '/all-user'}))
    .catch(err => console.log(err))
});

router.get('/edit-user/:id',async  (req,res) =>{
  const id = req.params.id;
  
  try{
    const user =  await User.findById(id);
    res.render('../views/editUser',{ title: 'Edit User', user });
    return true;
  }catch(e){
    console.log(e);
   return false;
  }
})

router.post('/edit-user', async (req,res) => {
  const { id,name,age } = req.body;
  
 const updated =  await User.updateOne({ _id: id },{
    $set:{
      name,
      age
    }
  })
  
 if(updated){
   res.redirect('/');
 }else{
   console.log(error)
 }
  
})

module.exports = router;