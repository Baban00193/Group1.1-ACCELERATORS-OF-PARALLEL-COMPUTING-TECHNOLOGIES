var express = require('express');
var router = express.Router();

let arr = []; //Used to fetch as history data...

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', function (req, res, next) {
  const ans = Number(req.body.num1) + Number(req.body.num2);
  arr.push({
    type: 'Add',
    data: `${req.body.num1} + ${req.body.num2}`,
    output: ans,
  });

  console.log(JSON.stringify(arr), arr.length);

  res.send({
    message: 'Success',
    data: ans,
  });
});

router.post('/sub', function (req, res, next) {
  const ans = Number(req.body.num1) - Number(req.body.num2);
  arr.push({
    type: 'Sub',
    data: `${req.body.num1} - ${req.body.num2}`,
    output: ans,
  });

  console.log(JSON.stringify(arr), arr.length);

  res.send({
    message: 'Success',
    data: ans,
  });
});

router.post('/mul', function (req, res, next) {
  const ans = Number(req.body.num1) * Number(req.body.num2);
  arr.push({
    type: 'Sub',
    data: `${req.body.num1} * ${req.body.num2}`,
    output: ans,
  });

  console.log(JSON.stringify(arr), arr.length);

  res.send({
    message: 'Success',
    data: ans,
  });
});

router.post('/div', function (req, res, next) {
  const ans = parseFloat(
    (Number(req.body.num1) / Number(req.body.num2)).toFixed(2)
  );
  arr.push({
    type: 'Sub',
    data: `${req.body.num1} / ${req.body.num2}`,
    output: ans,
  });

  console.log(JSON.stringify(arr), arr.length);

  res.send({
    message: 'Success',
    data: parseFloat(ans.toFixed(2)),
  });
});

router.get('/history', function (req, res, next) {
  res.send({
    message: 'Success',
    data: arr,
  });
});

router.post('/clear', function (req, res, next) {
  arr = [];
  res.send({
    message: 'Success',
  });
});

module.exports = router;
