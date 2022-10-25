const axios = require('axios')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c3d354b88c6db1",
        pass: "3e666cb98d5f9e"
    }
});


const bcrypt = require('bcrypt');
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.addUser = (req, res) => {
    const token = req.cookies.token;
    let payload = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        role: req.body.role,
        email: req.body.email,
        identifiant: req.body.identifiant
    }
    instance.post(`/users`, payload, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            try {
                let log_payload = {
                    auteur: 'Un administrateur',
                    method: 'Création',
                    ressource: 'Utilisateur',
                    date: new Date(),
                    heure: new Date().getHours(),
                    minute: new Date().getMinutes(),
                    id_ressource: ''
                }
                instance.post('/logs',log_payload, {
                    headers: {
                        'auth-token': token
                    }
                })
            } catch (error) {
                console.log(error);
            }
            req.flash('message', 'Utilisateur ajouté');
            res.redirect(`/utilisateurs`)
            console.log('utilisateur ajouté');
        })
        .catch((error) => {
            console.log(error);
            req.flash('message', 'Erreur lors de l\'ajout');
            res.redirect(`/utilisateurs`);
        })
}


exports.editUser = (req, res) => {
    const token = req.cookies.token;

    let payload = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        role: req.body.role,
        email: req.body.email,
        identifiant: req.body.identifiant,
        _id: req.body.id
    }
    instance.patch(`/users/${req.body.id}`, payload, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            req.flash('message', 'Utilisateur modifié');
            res.redirect(`/utilisateurs`)
            console.log('utilisateur modifié');
        })
        .catch((error) => {
            console.log(error);
            req.flash('message', 'Erreur lors de la modification');
            res.redirect(`/utilisateurs`)
            console.log('Erreur lors de la modification');
        })
}

exports.deleteUser = (req, res) => {
    const token = req.cookies.token;
    instance.delete(`/users/${req.params.id}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            try {
                let log_payload = {
                    auteur: 'Un administrateur',
                    method: 'Suppression',
                    ressource: 'Utilisateur',
                    date: new Date(),
                    heure: new Date().getHours(),
                    minute: new Date().getMinutes(),
                    id_ressource: ''
                }
                instance.post('/logs',log_payload, {
                    headers: {
                        'auth-token': token
                    }
                })
            } catch (error) {
                console.log(error);
            }
            req.flash('message', 'Utilisateur supprimé');
            res.redirect(`/utilisateurs`)
            console.log('utilisateur supprimé');
        })
        .catch((error) => {
            req.flash('message', 'Erreur lors de la supression');
            res.redirect(`/utilisateurs`)
            console.log('Erreur lors de la suppression');
        })
}

exports.resetUserPassword = async (req, res) => {
    const token = req.cookies.token;
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.identifiant, salt)
    let payload = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        role: req.body.role,
        email: req.body.email,
        identifiant: hashPassword
    }

    instance.patch(`/users/${req.params.id}`, payload, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            var mailOptions = {
                from: "g.lavitdh@gmail.com",
                to: req.body.email,
                subject: 'Mise à jour du mot de passe',
                text: `Votre mot de passe à été modifié, Nouveau mot de passe : ${req.body.identifiant}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: to ' + req.body.email + ' ' + info.response);
                }
            });
            try {
                let log_payload = {
                    auteur: 'Un administrateur',
                    method: 'Mise à jour',
                    ressource: 'Mot de passe',
                    date: new Date(),
                    heure: new Date().getHours(),
                    minute: new Date().getMinutes(),
                    id_ressource: ''
                }
                instance.post('/logs',log_payload, {
                    headers: {
                        'auth-token': token
                    }
                })
            } catch (error) {
                console.log(error);
            }
            req.flash('message', `Nouveau mot de passe : ${req.body.identifiant}`);
            res.redirect(`/utilisateurs`)
            console.log('Mot de passe modifié');
        })
        .catch((error) => {
            req.flash('message', 'Erreur lors de la réinitialisation du mot de passe');
            res.redirect(`/utilisateurs`)
            console.log(error);
            console.log('Erreur lors de la réinitialisation');
        })
}