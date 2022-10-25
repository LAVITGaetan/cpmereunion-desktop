const axios = require('axios')
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.login = async (req, res) => {
    try {
        res.render('login', { message: req.flash('message') })
    } catch (error) {
        console.log(error);
    }
}

exports.accueil = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch_users = await instance.get(`/users`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('index', { users: fetch_users.data, title: `Accueil`, message: req.flash('message') })

    } catch (error) {
        res.redirect('/')
    }
}

exports.adherents = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch_adherents = await instance.get(`/adherents`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('adherents/liste', { adherents: fetch_adherents.data, title: `Liste des adhérents`, message: req.flash('message') })

    } catch (error) {
        res.redirect('/')
    }
}

exports.adherent = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch_adherent = await instance.get(`/adherents/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('adherents/profil', { adherent: fetch_adherent.data, title: `Modifier un adhérent`, message: req.flash('message') })

    } catch (error) {
        res.redirect('/')
        console.log(error);
    }
}


exports.user = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch_user = await instance.get(`/users/${req.params.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('users/profile', { user: fetch_user.data, title: "Profil d' utilisateur", message: req.flash('message') })

    } catch (error) {
        res.redirect('/')
    }
}

exports.users = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch_users = await instance.get(`/users`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('users/liste', { users: fetch_users.data, title: "Liste des utilisateurs", message: req.flash('message') })

    } catch (error) {
        res.redirect('/')
    }
}


exports.logs = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch_logs = await instance.get(`/logs`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('logs/liste', { logs: fetch_logs.data, title: "Liste des logs", message: req.flash('message') })

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}
