const express = require("express");
const jwt = require("jsonwebtoken")
const {SECRET_KEY} =require("../config")
const User = require("../models/user")

const router = new express.Router()

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async function(req, res, next) {
    try {
        const {username, password} = req.body
        if(await User.authenticate(username, password)){
            await User.updateLoginTimestamp(username)
            let payload = {username: username}
            let _token = jwt.sign(payload, SECRET_KEY)
            return res.json({_token})
        }
    } catch (error) {
        return next(error)
    }
})

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async function(req, res, next) {
    try {
        const {username, password, first_name, last_name, phone} = req.body
        await User.register({username, password, first_name, last_name, phone})
        await User.updateLoginTimestamp(username)
        let payload = {username: username}
        let _token = jwt.sign(payload, SECRET_KEY)
        return res.json({_token})
    } catch (error) {
        return next(error)
    }
})

module.exports = router