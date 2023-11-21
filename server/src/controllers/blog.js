"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Blog Controller:
const Blog = require('../models/blog')
module.exports = {
    list: async (req, res) => {

        const data = await res.getModelList(Blog)
        res.status(200).send({
            error: false,
            // details: await res.getModelListDetails(Blog),
            data
        })
    },
    create: async (req, res) => {

        const data = await Blog.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    read: async (req, res) => {

        const data = await Blog.findOne({ _id: req.params.id })
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {

        const data = await Blog.updateOne({ _id: req.params.id }, req.body)
        res.status(202).send({
            error: false,
            data,
            new: await Blog.findOne({ _id: req.params.id })
        })
    },
    delete: async (req, res) => {
  
        const data = await Blog.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}