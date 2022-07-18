const express = require('express');
const path = require('path');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const Contact = require('./models/contact');

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));


// var contacts = [
//     {
//         name : "vinayak",
//        phoneno : "9743844141"
//     },
//     {
//         name:"achina" ,
//         phoneno : "9743844141"
//     }
// ];






app.get('/', function(req,res)
{

   Contact.find({} , function(err,contacts)
   {
    if(err)
    {
        console.log('error in fetching from db!');
        return;
    }
      
    return res.render('home',{
        title:"Contact List",
        contact_list : contacts
    });
   });

    // res.render('home', { 
    //     title : "Iron Man",
    //     contact_list : contacts
    // });
});

app.post('/create-contact' , function(req,res){
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phoneno);
    // return res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phoneno
    },    function(err,newContact){
        if(err)
        {
            console.log('error in creating a Contact!', err);
            return;
        }
        console.log(newContact);
        return res.redirect('/');
    });
});


// using request query
// app.get('/delete-contact' , function(req,res){
   
//     let id = req.query.id;
//     console.log(id);
//     console.log(typeof(id));
//     // console.log(id);
// //     let contactIndex = contacts.findIndex(contacts=>contacts.phone == phone);
// //    if(contactIndex!=-1)
// //    {
// //     contacts.splice(contactIndex,1);
// //    }

//     Contact.findByIdAndDelete(id , function(err)
//     {
//          if(err)
//          {
//             console.log('error in deleting an object from database!' , err);
//             return;
//          }

//       return res.redirect('back');
//     });
// });


// using request parameter
// app.get('/delete-contact/:id' , function(req,res){


    app.get('/delete-contact' , function(req,res){
   
    let id = req.query.id;


    // let id = req.params.id;
//    console.log(id);
    // console.log(id);
//     let contactIndex = contacts.findIndex(contacts=>contacts.phone == phone);
//    if(contactIndex!=-1)
//    {
//     contacts.splice(contactIndex,1);
//    }

    Contact.findByIdAndDelete(id , function(err)
    {
         if(err)
         {
            console.log('error in deleting an object from database!' , err);
            return;
         }

         console.log('deleted!' );
      return res.redirect('back');
    });
});






app.listen( port , function(err)
{
    if(err)
    {
        console.log("error" , err);
        return;
    }
      console.log("server is running in port " + port);
});