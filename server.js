// express server
const MAX_RESERVE = 4;
const express = require('express');
const path = require('path');

const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 3000;
const tables = [{}];
const waitingList = [{}];

// serve static files
// app.use(express.static(''));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/tables.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'tables.html'));
});

app.get('/reserve.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'reserve.html'));
});

// GET /api/tables
app.get('/api/tables', (req, res) => {
    // return table json object
    return res.json(tables);
});

// GET /api/waitinglist

// POST /api/tables
app.post('/api/reserve', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    console.log(req);
    const newReserve = req.body;
  
    const found = false;
    for (i=0; i<tables.length; i++) {
        if (newReserve.name === tables[i].name) {
            found = true;
            break;
        }
    }
    if (found) {
        return res.json({'status': 'exists'})
    }
    else if (tables.length > MAX_RESERVE) {
        waitingList.push(newReserve);
        return res.json({'status': 'wait'});
    }
    else {
        tables.push(newReserve);
        console.log(tables);
        return res.json({'status': 'reserved'});
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '404.html'));
})

// Listener
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));