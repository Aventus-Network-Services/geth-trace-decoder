# Geth-Trace-Debugger
### Calltrace decoder for Geth with output formatters and demonstration app

Development for Ethereum is hard. The tools currently available to support our role as developers are still crude in many ways. They are all welcome and essential but we are still very far away of the development environments for more mature technologies.

 In 2019, we have been spoiled for many years with IDEs, smart debuggers and other tools that are simply not yet available for Solidity development. Even the ecosystem itself is harsher: contracts have to be deployed in a public net in order to be properly tested; execution happens asynchronously, with an unspecified delay; and it is totally non-interactive: all the output we have comes down to a function reply or encoded transactions logs. We can debug transactions after the fact, but that is not always useful. And when a transaction reverts, we often get a cryptic message similar to `Error: Transaction has been reverted by the EVM` where Geth ignores any message associated to the revert action, even if the programmer was kind enough to provide it in the first place.

Overall, it is difficult to understand what makes a contrat fail, and in contract calls that make several calls of their own, finding the cause for an error is frequently a hair-pulling exercise.

Enter the geth-trace-decoder.

We developed this tool to reduce the frustration of our debugging sessions. It takes the call trace of a transaction (successful or failing) and decodes it into a human-readable way, so that the user will be able to understand the whole sequence of calls until the transaction failed. This tool is not able to extract the error associated with a revert, but typically it will give all the information exactly until that point, including:
* contract called into (by name or address)
* method name
* decoded inputs and outputs

We hope this is useful for the community at large. It is our 'Thank you!' for all the people working to make Ethereum the platform of the future, to improve the productivity of developers in this eco-system, and to make it an easier environment to develop in.

This repo provides a library that you can use and an example formatter making use of those libraries to output the results to console. Feel free to produce other formatters more suitable to your needs, and let us know if you find our work useful, if you know how it could be improved and how you'd like to see it evolve in the future.

Thank you to ConsenSys for their `abi-decoder` tool and the inspiration it gave us.

Happy coding!

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