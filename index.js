
const express = require('express')
const app = express()

const path = __dirname+'/static';
app.use(express.static(path));
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
});


app.listen(3000, () => console.log(' Listen port 3000'));
