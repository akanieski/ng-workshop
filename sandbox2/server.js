var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

app.get('/api/employees', function (req, res) {
  res.send([
      {
          employeeId: "10000",
          firstName: "John",
          lastName: "Doe",
          department: "accounting",
          age: 45
      },
      {
          employeeId: "10001",
          firstName: "Jane",
          lastName: "Doe",
          department: "accounting",
          age: 41
      },
      {
          employeeId: "10002",
          firstName: "Frank",
          lastName: "Wright",
          department: "marketing",
          age: 32
      }
  ]);
});

app.listen(5002, function () {
  console.log('Example app listening on port 5002!');
});