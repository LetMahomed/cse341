const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const contactsRoutes = require('./routes/contacts'); 
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Routes
app.use('/contacts', contactsRoutes); 
app.use('/', require('./routes')); 

// Initialize MongoDB and start server
mongodb.initDb((err) => {
    if (err) {
        console.log('Failed to connect to database:', err);
    } else {
        app.listen(port, () => {
            console.log(`Database connected and Node server running on port ${port}`);
        });
    }
});
