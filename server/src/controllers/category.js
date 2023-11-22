"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Category Controller:
const Category = require('../models/category')
module.exports = {
    list: async (req, res) => {

        const data = await res.getModelList(Category)

        res.status(200).send(data)
    },
    create: async (req, res) => {

        const data = await Category.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    read: async (req, res) => {

        const data = await Category.findOne({ _id: req.params.id })
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {

        const data = await Category.updateOne({ _id: req.params.id }, req.body)
        res.status(202).send({
            error: false,
            data,
            new: await Category.findOne({ _id: req.params.id })
        })
    },
    delete: async (req, res) => {
  
        const data = await Category.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}