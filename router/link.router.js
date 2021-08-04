const {Router} = require('express')
const config = require('config')
const shortId = require('shortid')
const Link = require('../models/link')
const authMiddlewear = require('../middlewear/auth.middlewear')


const router = Router()

router.post('/generate', authMiddlewear, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { from } = req.body
        const code = shortId.generate()

        const existing = await Link.findOne({ from })
        if (existing) {
            return res.json({ link: existing })
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({
            from, to, code, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({link})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.get('/', authMiddlewear, async (req, res) => {
    try {
        console.log('req.user: ', req.user)
        const links = await Link.find({ owner: req.user.userId })
        res.json({links})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.get('/:id', authMiddlewear, async (req, res) => {    
    try {
        const link = await Link.findById(req.params.id)
        res.json({link})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router