
// calling app from function
const app = require('./app');

require('dotenv').config();

// calling database from function

const dbConn = require('./configs/Conn');

dbConn();




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



