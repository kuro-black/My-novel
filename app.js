const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'wazaDEka2',
  database:'my_novel'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      console.log(results);
      res.render('top.ejs', {users: results});
    }
  );
});

app.listen(3000);

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

app.get('/finish', (req, res) => {
  res.render('finish.ejs');
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO users (writer, name) VALUES (?, ?)',
    [req.body.userWriter, req.body.userName],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM users WHERE id=?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM users WHERE id=?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {user: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE users SET writer=?, name=? WHERE id=?',
    [req.body.userWriter, req.body.userName, req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});
