const getModelByName = require('../db/getModelByName')

module.exports.signup = function (req, res) {
    if (!req.body.name) return res.status(200).send({ sucess: false, error: 'Ingresa el nombre de usuario.' });
    if (!req.body.password) return res.status(200).send({ sucess: false, error: 'Ingresa la contraseña.' });
    const User = getModelByName('user');
    try {
        User.signup(req.body.name,req.body.password).then(data => {
            res.status(200).send({ success: true, message: 'Usuario creado de manera exitosa', data })
        })
    } catch (error) { res.status(200).send({ success: false, error: error.message }) }
};

module.exports.login = function (req, res) {
    if (!req.body.name) return res.status(200).send({ sucess: false, error: 'Ingresa el nombre de usuario.' });
    if (!req.body.password) return res.status(200).send({ sucess: false, error: 'Ingresa la contraseña.' });
    const User = getModelByName('user');
    try {
        User.login(req.body.name, req.body.password).then(data => {
            res.status(200).send({ success: true, data });
        })
    } catch (error) { res.status(200).send({ success: false, error: error.message }) }
};

module.exports.current_user = function (req, res) {
    if (!req.user) return res.status(200).send({ success: true, data: { user: null } });

    const User = getModelByName('user');

    return User.findUserById(req.user._id)
        .then((user) => {
            res.status(200).send({ success: true, data: { user } });
        }).catch(err => res.status(200).send({ success: false, error: err.message }))
};