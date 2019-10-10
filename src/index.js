import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mysql from 'mysql';

const app = express();
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const connection = mysql.createConnection("mysql://"+DB_USER+":"+DB_PASS+"@"+DB_HOST+":"+DB_PORT+"/"+DB_DATABASE);

connection.connect()

//todo, fix cors;
app.use(cors());
app.use(express.json())

app.get('', (req, res) => {
  return res.send("This is root!");
})

app.get('/arduino', (req, res) => {
  connection.query('SELECT * FROM arduino_data', function (err, rows, fields) {
    if (err) throw err
    return res.send(rows);
  })
});

app.post('/arduino', (req, res) => {
  let q = req.query;
  let arduino_time = q.time;
  let arduino_distance = q.dist;
  connection.query('INSERT INTO arduino_data (arduino_time, arduino_distance) VALUES (?, ?);', [arduino_time, arduino_distance], (err, rows, fields) => {
    if (err) throw err;
    return res.send("Success!")
  });
});

app.post('/arduino_demo', (req, res) => {
  let arduino_time = Math.round(Math.random()*10000);
  let arduino_distance = Math.round(Math.random()*10000);
  connection.query('INSERT INTO arduino_data (arduino_time, arduino_distance) VALUES (?, ?);', [arduino_time, arduino_distance], (err, rows, fields) => {
    if (err) throw err;
    return res.send("Success!")
  });
});

app.post('/arduino_multiple', (req, res) => {
  let data = req.body;
  let query = "INSERT INTO arduino_data (arduino_time, arduino_distance) VALUES "
  let values = []
  for (let i = 0; i < data.length; i++) {
    if (i == data.length-1) {
      query += "(?,?);"
    } else {
      query += "(?,?),"
    }
    values.push(data[i].time, data[i].dist);
  }
  connection.query(query, values, (err, rows, fields) => {
    if (err) throw err;
    return res.send("Success!")
  });
})


//example with path.
// app.put('/users/:userId', (req, res) => {
//   return res.send(
//     `PUT HTTP method on user/${req.params.userId} resource`,
//   );
// });

app.listen(3000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
