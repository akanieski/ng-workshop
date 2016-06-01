"use strict"
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

let emps = [
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
  ];

app.get('/api/employees', function (req, res) {
  res.send(emps);
});

app.get('/api/employee/:employeeId', function (req, res) {
  res.send(emps.filter((e) => e.employeeId == req.params.employeeId).pop());
});

app.listen(5002, function () {
  console.log('Example app listening on port 5002!');
});