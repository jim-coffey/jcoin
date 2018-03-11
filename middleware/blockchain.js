const crypto = require('crypto')

class Blockchain {
  constructor() {
    this.chain = []
    this.current_transactions = []

    this.newBlock = this.newBlock.bind(this)
    this.newTransaction = this.newTransaction.bind(this)
    this.lastBlock = this.lastBlock.bind(this)
    this.proofOfWork = this.proofOfWork.bind(this)

    // create a genesis block
    this.newBlock(100, 1)
  }

  newBlock(proof, previous_hash) {
    const block = {
      index: this.chain.length + 1,
      timestamp: new Date(),
      transactions: this.current_transactions,
      proof,
      previous_hash
    }
    this.current_transactions = []
    this.chain.push(block)

    return block
  }

  newTransaction(sender, recipient, amount) {
    this.current_transactions.push({
      sender,
      recipient,
      amount
    })

    return this.lastBlock()['index'] + 1
  }

  hash(block) {
    const blockString = JSON.stringify(block)

    return crypto
      .createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
      .update(blockString)
      .digest('hex')
  }

  lastBlock() {
    return this.chain.slice(-1)[0]
  }

  validProof(lastProof, proof) {
    const guessHash = crypto
      .createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
      .update(`${lastProof}${proof}`)
      .digest('hex')
    
    return guessHash.substr(0, 5) === process.env.RESOLUTION_HASH
  }

  proofOfWork(lastProof) {
    let proof = 0
    
    while (true) {
      if (!this.validProof(lastProof, proof)) {
        proof++
      } else {
        break
      }
    }

    return proof
  }
}

module.exports = Blockchain
