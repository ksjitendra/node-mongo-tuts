const express = require('express')
const app = express()
const buff = Buffer.alloc(8)

buff.write("st", "utf-8")

var buff2 = Buffer.from("WElcome to buffer class")

console.log(buff2.toString(), "buff2");

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const basicAuth = require('express-basic-auth')
const dotenv = require('dotenv')
dotenv.config()
const createUser = require('./Controllers/usersController')
const rateLimit = require('express-rate-limit')
const slowDown = require('express-slow-down')


console.log(buff.toJSON());


const speedLimitter = slowDown({
    windowMs: 15* 60 * 1000, // 15 mins 
    delayAfter : 100, // delay
    delayMs : 500
})


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// we can pass it to only a specific api endpoint
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//This is the custom rules only for account creation 
const createAccountLimiter = rateLimit({
	windowMs: 60 * 1 * 1000, // 1 min
	max: 2, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


app.use(speedLimitter)
app.use(limiter)


// Swagger Setup 
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Task management',
        version: '1.0.0',
        description: 'NodeJs project with Mongodb and swagger integration'
      },
      servers: [
        {
            url: 'http://localhost:3000/', 
            description: 'Local server'
        },
        {
            url: 'http://staging.com', 
            description: 'Staging server'
        }
      ], 
      components: {
        securitySchemes: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization'
            },
        },
      },
    //   security: [
    //     {
    //         ApiKeyAuth: [],
    //     }
    //   ]sysctl fs.inotify.max_user_watches

    },
    apis: ['./*.js'], // files containing annotations as above
  };
  
const specs = swaggerJsDoc(options);


//######## mongo db connection########
const mongoConnection = mongoose.connect('mongodb+srv://jessejitendra:iAv6641JDK1Z6Zml@cluster0.eint8vd.mongodb.net/lynkup')

try {
    mongoConnection

    console.log('connection has established ');
} catch (error) {

    console.log('Connection has not established Error- '. error.message);
}





// import models 
const userModel = require('./Models/Users')
const cabModel = require('./Models/Cabs')

const port = 3000 
app.use(bodyParser.json())

app.use("/api-docs",basicAuth({ users: {test: 'test@123'}, challenge: true }), swaggerUi.serve, swaggerUi.setup(specs))

// ########## Redis usages #########
const redis = require('redis')
const redisClient = redis.createClient(6379, '127.0.0.1')

redisClient.connect()
redisClient.on('connect', function (err) {
    console.log('Redis connection Error'+ err);
});


app.get("/home",createAccountLimiter,  async (req, res) => {

    // let keyname = 'reviews'
    // let testData = {
    //     id:12,
    //     name: 'Test Demo'
    // }

    // try {

    //     let getCachedData = await redisClient.get(keyname)

    //     if(getCachedData) {

    //     }  else {
    //         redisClient.set(keyname, JSON.stringify(testData), {EX:30})
    //     }


    //     console.log(getCachedData);
        
    // } catch (error) {

    //     res.send(error.message)
        
    // }

    //######### Hash Functions #########

    let parentKey = "LynkupApp"
    let keyname = 'second'
    let testData = {
        id:13,
        name: 'Test Demo'
    }

    try {
        let getCachedData = await redisClient.hGet(parentKey,keyname)
        let allKeyData = await redisClient.hGetAll(parentKey)

        console.log(allKeyData, "allKeyData");

        if(getCachedData) {

        }  else {
            redisClient.hSet(parentKey,keyname, JSON.stringify(testData))
        }

        redisClient.DEL(parentKey)

    } catch (error) {
        console.log(error.message)
        res.send(error.message)   
    }
    res.send("Home page: ")
})


app.get("/", (req, res) => {
    res.send("This is the Home page")
})


/**
 * @swagger
 * /create/user:
 *   post:
 *     description: User create POST request
 *     parameters:
 *       - name: name
 *       - email: email
 *       - password: password
 *       - user_type: user_type
 *         in: body
 *         description: Request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: User's name
 *             email:
 *               type: string
 *               description: User's name
 *             password:
 *               type: string
 *               description: User's name
 *             user_type: 
 *               type: Number
 *               description: User's name
 *     responses:
 *       200:
 *         description: Successful response
 */


// creating a user in db
app.post('/create/user',createUser)

// function to delete a user in db 


// creating a cab in db 
app.post('/add/cab', async (req, res) => {

    const data = req.body 
    const cabObject = new cabModel()
    try {
        const saveCab = await cabModel.create(data)

        res.status(200).json({
            data: saveCab, 
            message:"Cab has saved successfully!"
        })

    } catch (error) {

        res.status(400).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
})

// fetching all cabs 
/**
 * @swagger
 * /get/cabs:
 *  get:
 *    summary: This method returns all cabs data 
 *    description: This method returns all cabs data
 *   
 *  response:
 *       200:
 *          description: get all cabs data    
 * 
 */
app.get("/get/cabs", async (req, res) => {

    try {
        const data = await cabModel.find().populate('driver_id').limit(1)
        res.status(200).json({
            data, 
            driver_id: data[0].driver_id._id
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })  
    }

})

// cabs of a single driver 
app.get('/get/cab/:driverId', async(req, res) => {

    const driverId  = req.params.driverId

    try {
        const data = await cabModel.find({driver_id: driverId})
        res.status(200).json({
            data
        })

    } catch (error) {

        res.status(400).json({
            message: error.message
        })
        
    }

})

// function to check multiple kind of queries
app.get('/check/queries', async (req, res) => {

try {
    
    // const data = await userModel.find({$nor: [{age : 21}, {email : 'jesse@gmail.com' }]}).sort({"name": 1, "user_type": 1}).skip(1);
    
    const data = await userModel.aggregate([{$group: {age : 21}}])
    res.status(200).json({
        data
    })

} catch (error) {

    res.status(400).json({
            message: error.message
        })   
}

})


app.listen(port, (error) => {
    if(error) {
        console.log(error.message);
    }
})