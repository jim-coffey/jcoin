var express = require('express');
var router = express.Router();
var { check } = require('express-validator/check')

const Jcoin = require('../middleware/jcoin')

const responseMiddleware = (req, res, next) => {
  return res.json(req.responseValue)
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'jCoin' });
});

router.post('/transactions/new', [
  check('sender', 'Sender must be a String').exists(),
  check('recipient', 'Recipient must be a String').exists(),
  check('amount', 'Amount must be an Int Value').isInt().exists()
], Jcoin.newTransaction, responseMiddleware)

router.get('/mine', Jcoin.mine, responseMiddleware)

router.get('/chain', Jcoin.getChain, responseMiddleware)

module.exports = router;
