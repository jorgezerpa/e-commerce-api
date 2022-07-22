const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { getAuthByEmail } = require('../../../controllers/auth.controller');
const { getUser } = require('../../../controllers/users.controller');

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async(email, password, done)=>{
    try{
        const user = await getAuthByEmail(email);
        if(!user){
            done(boom.unauthorized('unauthorized'), false)
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            done(boom.unauthorized('unauthorized'), false)
        }
        const userData = await getUser(user.id);
        done(null, userData[0])
    }
    catch(e){
        done(e, false)
    }
})


module.exports = localStrategy;
