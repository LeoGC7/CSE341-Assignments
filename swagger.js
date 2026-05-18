const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Contacts API for CSE341 Week 2',
    },
    host: 'cse341-assignments-dzqm.onrender.com',
    schemes: ['https', 'http'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
