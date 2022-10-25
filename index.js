const express = require("express");
const { app, BrowserWindow } = require("electron");
const path = require("path");
const flash = require('connect-flash');
const services = require('./app/services/render');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const authenticationRoutes = require('./app/controllers/authentication');
const userRoutes = require('./app/routes/user');
const adherentRoutes = require('./app/routes/adherent');
let win;
let application = express();

// Session && Cookies
application.use(cookieParser())
application.set('trust proxy', 1);
application.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
application.use(flash())
application.set("view engine", "ejs");
application.use(express.static(__dirname + "/public"));
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

function createWindow() {
    win = new BrowserWindow({
        minWidth:930,
        width: 1000,
        minHeight:600,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "app/js/preload.js"),
        },
    });

    // Logic
    application.use('/adherents', adherentRoutes)
    application.use('/users', userRoutes)
    application.post('/login', authenticationRoutes.login)
    application.get('/logout', authenticationRoutes.logout)

    // Render view
    application.get("/accueil", services.accueil);
    application.get("/", services.login);
    application.get("/utilisateurs", services.users);
    application.get("/user/:id", services.user);
    application.get("/adherents", services.adherents)
    application.get("/adherent", services.adherent)
    application.get("/logs", services.logs)

    // Start server
    const PORT = process.env.PORT || 3000;
    application.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    win.loadURL(`http://localhost:${PORT}/`);
    // win.removeMenu();
    win.maximize();
    win.focus();
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});