import express = require('express');

const sessionAuth = (req: any, res: any) => {
    if(req.session) {
        res.send(req.session)
    } else { res.redirect('/login');}
}

module.exports = sessionAuth;