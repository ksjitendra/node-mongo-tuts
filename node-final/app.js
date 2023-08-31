
const express = require('express')
const app = express()

const { swaggerServe, swaggerSetup }  = require('./swagger_config')

app.listen(3000, (err)=> {

    if(err) {
        console.log(err);
    }

    console.log('Server has started on localhost:3000');

})

app.use("/api-docs", swaggerServe, swaggerSetup)

app.get("/test", (req, res) => {
    res.status(200).json({
        message:"This is the test API endpoint"
    })
})

// Get url details api 
app.get("/user/:userId", (req, res) => {

   const userId = req.params.userId
   const userDetails = [
    {
        name: "Jitendra Kumar",
        age: "25",
        profession : "Software Engineer"
    }, 
    {
        name: "Jack", 
        age: 30, 
        profession: "Software Engineer"
    },
    {
        name: "Nick", 
        age: 31, 
        profession: "Software Engineer"
    }
   ]

   res.status(200).json({
    data : userDetails[userId], 
    message: "Data retrive successfully"
   })

})