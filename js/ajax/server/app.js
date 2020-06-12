const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

const users = require('./routes/users');

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin','*');
  res.set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Authorization');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', users);

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(err.statusCode).send(err)
  }
  return res.status(500).send(err);
})

app.get('*', (req, res) => {
  res.status(404).send({message: 'Not Found'});
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});