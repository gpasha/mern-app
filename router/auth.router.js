const {Router} = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')

router.post(
    '/register',
    [
        check('email', 'Non-correct email!').isEmail(),
        check('password', 'Min length of the password is 6 symbols').isLength({min: 6})
    ],
    async (res, req) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Non-correct regicter data'
                })
            }

            const {email, password} = req.body
            const condidate = await User.findOne({email})

            if (condidate) {
                return res.status(400).json({message: 'This user has already existed!'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email, password: hashedPassword
            })
            await user.save()
            res.status(201).json({message: 'The user was successfully created!'})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something went wrong'})
        }
    }
)

router.post(
    '/login',
    [
        check('email', 'Non-correct email!').normalizeEmail().isEmail(),
        check('password', 'Min length of the password is 6 symbols').exists()
    ],
    async (res, req) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Non-correct regicter data'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({message: 'This user has not existed!'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'There are some troubles of login and password'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.status(200).json({
                token,
                userId: user.id
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something went wrong'})
        }
    }
)

module.exports = router