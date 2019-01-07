/*eslint no-console: ["error", { allow: ["log"] }] */

const traceProcessor = require('../lib/traceProcessor');

const config = require('./config.json');
const consoleOutputFormatter = require('../lib/consoleOutputFormatter');
const fs = require('fs');

// you can pass in hard coded values to decode
function demo_manualInput() {
  const processor = new traceProcessor([config.demoABI]);
  const result = processor.decodeTrace(config.demoVmTrace);
  console.log('demo_manualInput() : \n', consoleOutputFormatter.format(result));
}

// specifying known addresses will replace address values with friendly names
function demo_knownAddresses() {
  const processor = new traceProcessor([config.demoABI], config.knownAddresses);
  const result = processor.decodeTrace(config.demoVmTrace);
  console.log('demo_knownAddresses() : \n', consoleOutputFormatter.format(result));
}

// you can specify multiple abi's
function demo_multipleContracts() {
  // specify the folder that contains your contract ABI
  const jsonFiles = fs.readdirSync('./abi');

  const abis = jsonFiles.map(function (file) {
    const content = fs.readFileSync('./abi/' + file);
    return {name: JSON.parse(content).contractName, abi: JSON.parse(content).abi};
  });

  const processor = new traceProcessor(abis, config.knownAddresses);
  const result = processor.decodeTrace(config.demoVmTrace);
  console.log('demo_multipleContracts() : \n',consoleOutputFormatter.format(result));
}

// if you use custom types, you can pass in a mapper to convert your custom type to a solidity primitive type
function demo_customTypes() {
  const processor = new traceProcessor([config.demoABI], config.knownAddresses, mapStringToAddress);
  const result = processor.decodeTrace(config.demoVmTrace);
  console.log('demo_customTypes() : \n',consoleOutputFormatter.format(result));
}

// if testing on rinkeby, you can get the vm trace from rinkeby.etherscan.io
async function demo_rinkeby() {
  const rinkebyUrl = {
    host: 'rinkeby.etherscan.io',
    path: '/vmtrace?txhash=' + config.demoTransactionHash + '&type=gethtrace2'
  };

  const processor = new traceProcessor([config.demoABI], config.knownAddresses);
  const vmTrace = await downloadTrace(rinkebyUrl, (html => html('pre').text()));

  const result = processor.decodeTrace(vmTrace);
  console.log('demo_rinkeby() : \n',consoleOutputFormatter.format(result));
}

// on the main net, you can get the vm trace from etherscan.io
async function demo_mainNet() {
  // example: BNB (Binance) contract transaction hash
  const mainNetTransactionHash = '0x766e53153b1e85a94cc834fe057a62eba93db6950c94a1fe1a845cd525c50a57';
  const mainNetUrl = {
    host: 'etherscan.io',
    path: '/vmtrace?txhash=' + mainNetTransactionHash + '&type=parity'
  };

  const jsonFiles = fs.readdirSync('./abi');

  const abis = jsonFiles.map(function (file) {
    const content = fs.readFileSync('./abi/' + file);
    return {name: JSON.parse(content).contractName, abi: JSON.parse(content).abi};
  });

  const processor = new traceProcessor(abis, config.knownAddresses);
  const vmTrace = await downloadTrace(mainNetUrl, extractExampleVmTraceForMainNet);

  const result = processor.decodeTrace(vmTrace);
  console.log('demo_mainNet() : \n',consoleOutputFormatter.format(result));
}


// NOTE: the transaction data will get removed from your local node after a certain period of time so make sure to run this
// as soon as you get a transaction hash.
// You need to replace the IP if you are not accessing it as localhost, and replace <YOUR TRANSACTION HASH> with a tx hash
function demo_privateGethNode() {
  const traceGetter = require('../lib/traceGetter');

  const processor = new traceProcessor([config.demoABI], config.knownAddresses);
  const vmTrace = traceGetter.getTrace('http://127.0.0.1:8545', '<YOUR TRANSACTION HASH>');
  const result = processor.decodeTrace(vmTrace);
  console.log('demo_privateGethNode() : \n',consoleOutputFormatter.format(result));
}

// If you use custom types in your solidity code (e.g. interfaces), you can use a mapper function to decode them
//   _paramName: the name of the variable
//   _paramType: the type of the variable
// see demo_customTypes()
function mapStringToAddress(_paramName, _paramType) {
  if (_paramType == 'string') return 'address';
  return _paramType;
}

function downloadTrace(_url, _parser) {
  const http = require('http');
  const cheerio = require('cheerio');

  return new Promise((resolve, reject) => {
    let htmlData = '';

    const request = http.request(_url, function (res) {
      res.on('data', function (chunk) {
        htmlData += chunk;
      });

      res.on('end', function () {
        const $ = cheerio.load(htmlData);

        const jsonOutput = JSON.parse(_parser($));
        resolve(jsonOutput);
      });
    });

    request.on('error', function (e) {
      reject('Error: \n', e.message);
    });

    request.end();
  });
}

function extractExampleVmTraceForMainNet(html) {
  const rawTrace = JSON.parse('[' + html('pre').text() + ']');
  const callJson = rawTrace[0].action;
  callJson['output'] = rawTrace[0].result.output;
  return JSON.stringify(callJson);
}

demo_manualInput();
demo_knownAddresses();
demo_multipleContracts();
demo_customTypes();
demo_rinkeby();
demo_mainNet();
// Update the IP and Transaction hash before uncommenting this
// demo_privateGethNode();