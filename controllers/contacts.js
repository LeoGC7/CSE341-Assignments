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

module.exports = {
    getContacts,
    getContactById,
}
