const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { getAuthByEmail } = require('../../../controllers/auth.controller');

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async(email, password, done)=>{
    try{
        const user = await getAuthByEmail(email);
        if(!user){
            done(boom.unauthorized(), false)
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            done(boom.unauthorized(), false)
        }
        done(null, user)
    }
    catch(e){
        done(e, false)
    }
})


module.exports = localStrategy;
