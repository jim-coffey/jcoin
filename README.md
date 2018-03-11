# Simple Block Chain

Simple block chain implementation in Node.js

Manually play with API via Express Server : http://locahost:3000

| Method | Path                | Description                 |
|--------|---------------------|-----------------------------|
| GET    | `/`                 | home of Jcoin               |
| GET    | `/chain`            | see the current block chain |
| GET    | `/mine`             | mine a new block            |
| POST   | `/transactions/new` | record a transaction        |

See example requests in `postman.json`

## Recording a Transaction

Returns the id of the block on which the transaction will be recorded

Example POST body
```
{
  "sender": "userId",
  "recipient": "userId",
  "amount": 5
}
```

## Mining

Mining a block records new transactions in the block and adds it to the chain

## Install

`yarn install`

## Test

`npm t`

## Basic Docker Commands

Run the docker image directly

* `docker build -t blockchain .`
* `docker run --name jcoin -p 3000:3000 -i -t blockchain`

Run via docker-compose

* `docker-compose up`

## Environment Variables Required

```
CRYPTO_SECRET=<any_string>
HASH_TYPE=<crypto_algorith_eg_sha256>
RESOLUTION_HASH=<first_5_chars_of_hash>
NODE_NAME="<any_string>"
```
