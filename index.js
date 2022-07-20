const express = require('express')
const bodyParser =require('body-parser');
const usersRoutes = require('./src/routes/users.route');
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";


const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.delete('/api/deleteallusers',usersRoutes);

app.listen(port, () => console.log(`app listening on port ${port}!`))