const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');

require("./db/conn")
const Student =require ("./models/registerdata");
const port = process.env.PORT || 8000;
app.use(express.json());
app.use('/static',express.static('public'));
app.use("/public",express.static('images'))

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set("views", template_path);
hbs.registerPartials(partials_path);

// console.log(static_path);

app.use(express.urlencoded({extended:false}));
//app.use(express.static(static_path))


app.get("/", (req,res)=>{
   res.render("login");
})
app.get("/register",(req,res)=>{
   res.render("register");
})

app.get("/login", (req,res)=>{
   res.render("login");
})

app.post("/register", async(req,res)=>{
   try{
      const password = req.body.password;
      const cpassword = req.body.cpassword;
      if(password === cpassword){
        const registerEmployee = new Student({
         firstname:req.body.firstname,
         lastname:req.body.lastname,
         email:req.body.email,
         gender:req.body.gender,
         phone:req.body.phone,
         age:req.body.age,
         password:req.body.password,
         cpassword:req.body.cpassword
        })
        const registered = await registerEmployee.save();
        res.status(201).render('login');
        
      }else{
         res.send("Password does not match")
      }

   }catch(error){
      res.status(400).send(error);
   }
} )

app.post("/login", async (req, res) => {
   try {
      const email = req.body.email;
      const password = req.body.password;
      const useremail = await Student.findOne({ email: email });
      
      if(useremail.password === password){
         res.status(201).render('index');
      }else{
         res.send("Password are not match");
      }
   } catch (error) {
      res.status(400).send("Invalid Email");
   }
});
app.listen(port, (req,res)=>{
   console.log(`listing the port ${port}`);
})


