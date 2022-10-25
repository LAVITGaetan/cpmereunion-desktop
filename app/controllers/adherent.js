const axios = require('axios')

const instance = axios.create({
    baseURL: process.env.API_URL,
})
exports.deleteAdherent = (req, res) => {
    const token = req.cookies.token;
    instance.delete(`/adherents/${req.params.id}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            req.flash('message', 'Adhérent supprimé');
            res.redirect(`/adherents`)
        })
        .catch((error) => {
            req.flash('message', 'Erreur lors de la supression');
            res.redirect(`/utilisateurs`)
        })
}
