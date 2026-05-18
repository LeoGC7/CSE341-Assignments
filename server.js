// Requires
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const mongodb = require('./db/connect')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

// App instance
const app = express()
// Port
const port = process.env.PORT || 8080

// App use statements
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Basic Route to the / endpoint
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/', require('./routes'))

// Start the app
mongodb.initDb((err) => {
    if (err) {
        console.log('There as an error: ' + err)
    } else {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port} and DB is connected`)
        })
    }
})
