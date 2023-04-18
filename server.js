const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const User = require('./models/Users')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/firstmongo')

app.use(cors())
app.use(express.json())
app.use('/', express.static(path.resolve(__dirname, 'assets')))

app.post('/api/login', async (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    console.log('body =>', body)
    // return;
    const response = await User.findOne({
        email: email
    })
    if (response) {
        console.log(response.password)
        if (await bcrypt.compare(password, response.password)) {
            res.json({
                'status': true,
                'message': 'login successful'
            })
        } else {
            res.json({
                status: false,
                message: 'login failed'
            })
        }
    } else {
        res.json({
            status: false,
            message: 'login failed'
        })
    }
})

app.post('/api/resister', async (req, res) => {
    const body = req.body;
    try {
        const email = body.email;
        const password = body.password;
        const encryptedPassport = await bcrypt.hash(password, 10)
        console.log('EncryptedPassport => ', encryptedPassport)
        const response = await User.create({
            email: email,
            password: encryptedPassport
        })
        if (response) {
            console.log(response)
            res.json({
                'status': false,
                'message': 'Account created successfully!'
            })
        } else {
            res.json({
                'status': false,
                'message': 'error!'
            })
        }
    } catch (e) {
        console.log(e.message)
        res.json({
            'status': false,
            'message': 'User already register!'
        })
    }
})



app.listen(port, async () => {
    console.clear()
    console.log(`Server started at http://localhost:${port}/`)
})
