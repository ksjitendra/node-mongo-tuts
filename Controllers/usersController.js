
const userModel = require('../Models/Users')

const createUser = async (req, res) => {

    const data = req.body 
    const userObject = new userModel()

    try {
        const saveUser = await userModel.create(data)

        res.status(200).json({
            statusCode: 200,
            data: saveUser, 
            message: 'User has been created successfully!'
        })

    } catch (error) {

        res.status(400).json({
            message: error.message,
        })
        
    }

}

module.exports = createUser
