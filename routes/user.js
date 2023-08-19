const { Router } = require('express')
const router = Router()
const User = require('../models/user')

router.get('/signin', (req, res) => {
    return res.render('signin')
})

router.get('/signup', (req, res) => {
    return res.render('signup')

})

router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/')
})

router.post('/signin', async(req, res) => {
    const {email, password} = req.body

  try{
    const token = await User.matchPasswordAndGenerateTokens(email, password)
    return res.cookie('token', token).redirect('/') 
 } catch (error) {
    return res.render('signin', {
        error: 'incorrect Email or Password'
    })
}
})

router.post('/signup', async (req, res) => {

    const {fullName, email, password} = req.body

        await User.create({
        fullName: fullName,
        email: email,
        password: password,
    })
    return res.redirect('/')
})


    // try {
    //     // Create a new user with the provided data
    //     const newUser = await User.create({
    //       fullName,
    //       email,
    //       password,
    //     });
    
    //     console.log('New user created:', newUser);
    //     return res.redirect('/');
    //   } catch (error) {
    //     console.error('Error creating user:', error);
    //     return res.status(500).json({ error: 'Failed to create user.' });
    //   }
    // });

module.exports = router