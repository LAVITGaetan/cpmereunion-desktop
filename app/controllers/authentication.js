const axios = require('axios')
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.login = async (req, res) => {
    try {
        instance.post(`/users/login`, {
            email: req.body.email,
            identifiant: req.body.identifiant
        })
            .then((response) => {
                if (response.data.token) {
                    if (response.data.role !== "admin") return res.send({ erreur: 'vous n etes pas autorisé' })
                    res.cookie('token', response.data.token, {
                        secure: true,
                        httpOnly: true,
                        maxAge: 3600 * 60 * 24,
                    }).redirect('/accueil')
                }
                else {
                    req.flash('message', 'Connexion impossible, vérifiez votre identifiant et mot de passe');

                    res.redirect('/')
                    console.log(response);
                }

            }).catch((err) => {
                req.flash('message', 'Connexion impossible, vérifiez vos informations');

                res.redirect('/')
                console.log(err);
            })
    } catch (error) {
        req.flash('message', 'Connexion impossible, vérifiez vos informations');

        res.send('/')
        console.log(error);
    }


}

exports.logout = (req, res) => {
    req.flash('message', 'Deconnexion réussie.');
    res.clearCookie('token').redirect('/')
}

exports.token = (req, res) => {
    try {
        let field = req.body.field;
        let token = req.cookies.token
        console.log(field);
        console.log('token :' + token);
    } catch (error) {
        console.log(error);
    }
}