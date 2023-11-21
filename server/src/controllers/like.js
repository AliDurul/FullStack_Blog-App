"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Like Controller:
const Like = require('../models/like')
module.exports = {

    create: async (req, res) => {

        req.body.user_id = req.user._id

        req.body.post_id = req.params.id


        console.log(req.body);

        // const data = await Like.create(req.body)
        res.status(201).send({
            error: false,
            // data
        })
    },

}