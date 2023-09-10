require('dotenv').config();
const express = require('express')

const app = express();
const appRoutes = require('./routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',appRoutes)
app.get("/api/test", (req, res) => {
    res.json({ message: "Welcome to my application.", abc:process.env.DATABASE_URL });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});