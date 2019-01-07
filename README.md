# GethDebugger

Calltrace decoder for Geth with output formatters and demonstration app

## Prerequisites
From the root and (/publicDemo) run
```
npm install
```

## Examples
The examples provided in `demo.js` are very simple implementations to highlight the different use cases for this library. They are not production ready implementations.

* Decoding hard coded call trace
```js
demo_manualInput()
```
* Replacing addresses with friendly names
```js
demo_knownAddresses()
```
* Multiple contracts (ABIs)
```js
demo_multipleContracts()
```
* Handling custom solidity types
```js
demo_customTypes()
```
* Getting call trace from rinkeby via etherscan()
```js
demo_rinkeby()
```
* Getting call trace from the main net via etherscan()
```js
demo_mainNet()
```
* Getting call trace directly from a geth node.
To run this function you need to replace `<YOUR TRANSACTION HASH>` with a **recent** transaction hash and update the RPC IP address used to connect to your node if required.
```js
demo_privateGethNode()
```

## Running the demonstration app
From /publicDemo run
```js
node demo.js
```