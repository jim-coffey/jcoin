const assert = require('assert')
const Jcoin = require('../middleware/jcoin')

// Get enviroment in the .env
require('dotenv').config()

describe('Jcoin API', () => {
  describe('/getChain', () => {
    it('Should return a chain with only the genesis block', () => {
      const req = {}
      Jcoin.getChain(req, {}, () => {
        const chain = req.responseValue.chain
        assert.equal(chain.length, 1)
      })

    })
  })
  describe('/mine', () => {
    it('Should mine a new block to add into the chain', () => {
      const req = {}
      Jcoin.mine(req, {}, () => {
        Jcoin.getChain(req, {}, () => {
          const chain = req.responseValue.chain
          assert.equal(chain.length, 2)
        })
      })
    })
  })
  describe('/transaction/new', () => {
    it('Should add the new transaction to the next mining', () => {
      const req = {
        body: {
          sender: 'sender1',
          recipient: 'sender2',
          amount: 1
        }
      }
      Jcoin.newTransaction(req, {}, () =>{
        Jcoin.mine(req, {}, () => {
          Jcoin.getChain(req, {}, () => {
            const chain = req.responseValue.chain
            const transactions = chain.slice(-1)[0].transactions
            assert.equal(transactions[0].sender, 'sender1')
          })
        })
      })
    })
  })
})
