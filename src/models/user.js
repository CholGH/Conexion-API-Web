const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.signup = signup;
UserSchema.statics.login = login;
UserSchema.statics.findUserById = findUserById;

mongoose.model('user', UserSchema, 'users');

function signup(name,password) {
    if (!name) throw new Error('Ingresa un nombre de usuario.');
    if (!password) throw new Error('Ingresa una contraseña.');
    return this.findOne({ name: name, password: password })
        .then(user => {
            if (user) throw new Error('Ya existe un usuario con ese nombre.');
            const newUser = {
                name: name,
                password: bcrypt.hashSync(password, 9)
            };
            return this.create(newUser);
        })
        .then(userCreated => userCreated);
};
function login(name, password) {
    return this.findOne({ name })
        .then(user => {
            if (!user) throw new Error('Ingresa una contraseña.');
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) throw new Error('Contraseña incorrecta');
            const userObject = {
                _id: user._id,
                name: user.name
            };
            const access_token = jwt.sign(Object.assign({}, userObject), process.env.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 4,
            });
            return { access_token, }
        })
}

function findUserById(_id){
    return this.findById(_id).then(user=>{
        return{
            _id:user._id,
            name:user.name,
        }
    })
}