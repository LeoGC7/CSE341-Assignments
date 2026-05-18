const { ObjectId } = require('mongodb')
const mongodb = require('../db/connect')

const getContacts = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('cse341').collection('contacts').find()

        const contacts = await result.toArray()
        res.status(200).json(contacts)
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching contacts',
            error: err,
        })
    }
}

const getContactById = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id)

        const result = await mongodb
            .getDatabase()
            .db('cse341')
            .collection('contacts')
            .find({ _id: contactId })

        const contacts = await result.toArray()
        res.status(200).json(contacts[0])
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching contact',
            error: err,
        })
    }
}

const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        }

        if (
            !contact.firstName ||
            !contact.lastName ||
            !contact.email ||
            !contact.favoriteColor ||
            !contact.birthday
        ) {
            return res.status(400).json({
                message: 'All fields are required',
            })
        }

        const response = await mongodb
            .getDatabase()
            .db('cse341')
            .collection('contacts')
            .insertOne(contact)

        if (response.acknowledged) {
            res.status(201).json({
                id: response.insertedId,
            })
        } else {
            res.status(500).json({
                message: 'Error creating contact',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error creating contact',
            error: err,
        })
    }
}

const updateContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id)

        const contactUpdated = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        }

        if (
            !contactUpdated.firstName ||
            !contactUpdated.lastName ||
            !contactUpdated.email ||
            !contactUpdated.favoriteColor ||
            !contactUpdated.birthday
        ) {
            return res.status(400).json({
                message: 'All fields are required',
            })
        }

        const response = await mongodb
            .getDatabase()
            .db('cse341')
            .collection('contacts')
            .replaceOne({ _id: contactId }, contactUpdated)

        if (response.modifiedCount > 0) {
            res.status(204).send()
        } else {
            res.status(500).json({
                message: 'Error updating contact',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error updating contact',
            error: err,
        })
    }
}

const deleteContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id)

        const response = await mongodb
            .getDatabase()
            .db('cse341')
            .collection('contacts')
            .deleteOne({ _id: contactId })

        if (response.deletedCount > 0) {
            res.status(200).send()
        } else {
            res.status(500).json({
                message: 'Error deleting contact',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting contact',
            error: err,
        })
    }
}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
}
