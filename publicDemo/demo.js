/*eslint no-console: ["error", { allow: ["log"] }] */

const traceProcessor = require('../lib/traceProcessor');

const config = require('./config.json');
const consoleOutputFormatter = require('../lib/consoleOutputFormatter');
const fs = require('fs');

const trace1 = `
{
  "type": "CALL",
  "from": "0x7830c87c02e56aff27fa8ab1241711331fa86f43",
  "to": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
  "value": "0x0",
  "gas": "0x1df680",
  "gasUsed": "0x783c2",
  "input": "0xca350aa60000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000003d0900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000093cf28642006597c6dcaf276d0d5aa3b69c692a4000000000000000000000000000000000000000000000000000000000519542a000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000de4d2ecbd63e7849506b667f97adaeafef67176000000000000000000000000000000000000000000000000000000000064550a8000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000e0813ea984e7e2cacdc9d9224d5974942bde4172000000000000000000000000000000000000000000000000000000000658c009000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000f5ca52a03e68aadc68e9e7a77cb77c7cf68e03a1000000000000000000000000000000000000000000000000000000000c1ea80b000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000fc68377d538a4ff742130188a550670519adc995000000000000000000000000000000000000000000000000000000001dbb2a71000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000073394ad7d1e557d4914e3e9fad9db91067c1523a000000000000000000000000000000000000000000000000000000003ba732a7000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec70000000000000000000000004c3e216ad9114312925b551f6792bc167b1354c300000000000000000000000000000000000000000000000000000000b4018b00000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000b715ade23f64d0d8db9eebb4ad6fa66a40bba104000000000000000000000000000000000000000000000000000000071652dba0000000000000000000000000be9895146f7af43049ca1c1ae358b0541ea49704000000000000000000000000c0c0b1e384e088cf91f198f1405ad0a04daba750000000000000000000000000000000000000000000000003782dace9d9000000000000000000000000000000bbbbca6a901c926f240b89eacb641d8aec7aeafd00000000000000000000000018444ad82a0d6732ea10e1a68c9f1e73c40c74c70000000000000000000000000000000000000000000002909c286ef27085c400000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000e5f31e220d788281af9d564364486510963c6fc800000000000000000000000000000000000000000000000000000000004c4b40000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000899a2f8980b5b3e33885393fa919a651c0029dc80000000000000000000000000000000000000000000000000000000005f5e100000000000000000000000000f17e65822b568b3903685a7c9f496cf7656cc6c200000000000000000000000037d9fb573c96b3d8fcb76ff78ee863df5e2fe38300000000000000000000000000000000000000000000010e5bb0d82561f094000000000000000000000000006dea81c8171d0ba574754ef6f8b412f2ed88c54d000000000000000000000000a1312ab3f42c6685cb336cceca6d5cb3c492a65d000000000000000000000000000000000000000000000002505515fab5368400000000000000000000000000e28b3b32b6c345a34ff64674606124dd5aceca30000000000000000000000000c5d4ec9300be6da89a3db305c415c7cd3cbb7e8e00000000000000000000000000000000000000000000002c3733e4a5d43c28000000000000000000000000009e32b13ce7f2e80a01932b42553652e053d6ed8e00000000000000000000000094628ae8a0dd6eeefb200a18aaa703dfc8270c7f0000000000000000000000000000000000000000000000022d9060f963390800",
  "output": "0x",
  "calls": [
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0xa281",
          "input": "0xa9059cbb00000000000000000000000093cf28642006597c6dcaf276d0d5aa3b69c692a4000000000000000000000000000000000000000000000000000000000519542a",
          "index": 461,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x68b1",
          "input": "0xa9059cbb000000000000000000000000de4d2ecbd63e7849506b667f97adaeafef67176000000000000000000000000000000000000000000000000000000000064550a8",
          "index": 1416,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x68b1",
          "input": "0xa9059cbb000000000000000000000000e0813ea984e7e2cacdc9d9224d5974942bde4172000000000000000000000000000000000000000000000000000000000658c009",
          "index": 2371,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x68b1",
          "input": "0xa9059cbb000000000000000000000000f5ca52a03e68aadc68e9e7a77cb77c7cf68e03a1000000000000000000000000000000000000000000000000000000000c1ea80b",
          "index": 3326,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x25e5",
          "input": "0xa9059cbb000000000000000000000000fc68377d538a4ff742130188a550670519adc995000000000000000000000000000000000000000000000000000000001dbb2a71",
          "index": 4281,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x25e5",
          "input": "0xa9059cbb00000000000000000000000073394ad7d1e557d4914e3e9fad9db91067c1523a000000000000000000000000000000000000000000000000000000003ba732a7",
          "index": 5236,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x68b1",
          "input": "0xa9059cbb0000000000000000000000004c3e216ad9114312925b551f6792bc167b1354c300000000000000000000000000000000000000000000000000000000b4018b00",
          "index": 6191,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x68b1",
          "input": "0xa9059cbb000000000000000000000000b715ade23f64d0d8db9eebb4ad6fa66a40bba104000000000000000000000000000000000000000000000000000000071652dba0",
          "index": 7146,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xbe9895146f7af43049ca1c1ae358b0541ea49704",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x689f",
          "input": "0xa9059cbb000000000000000000000000c0c0b1e384e088cf91f198f1405ad0a04daba750000000000000000000000000000000000000000000000003782dace9d9000000",
          "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "calls": [
              {
                  "type": "DELEGATECALL",
                  "from": "0xbe9895146f7af43049ca1c1ae358b0541ea49704",
                  "to": "0x31724ca0c982a31fbb5c57f4217ab585271fc9a5",
                  "gas": "0x3a5c7",
                  "gasUsed": "0x4c7f",
                  "input": "0xa9059cbb000000000000000000000000c0c0b1e384e088cf91f198f1405ad0a04daba750000000000000000000000000000000000000000000000003782dace9d9000000",
                  "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
                  "index": 8195,
                  "pc": 1325
              }
          ],
          "index": 8101,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x323b",
          "input": "0xa9059cbb00000000000000000000000018444ad82a0d6732ea10e1a68c9f1e73c40c74c70000000000000000000000000000000000000000000002909c286ef27085c400",
          "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "index": 8985,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0xabf1",
          "input": "0xa9059cbb000000000000000000000000e5f31e220d788281af9d564364486510963c6fc800000000000000000000000000000000000000000000000000000000004c4b40",
          "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "calls": [
              {
                  "type": "DELEGATECALL",
                  "from": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                  "to": "0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf",
                  "gas": "0x3a572",
                  "gasUsed": "0x8f78",
                  "input": "0xa9059cbb000000000000000000000000e5f31e220d788281af9d564364486510963c6fc800000000000000000000000000000000000000000000000000000000004c4b40",
                  "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
                  "index": 9781,
                  "pc": 1680
              }
          ],
          "index": 9659,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x2d61",
          "input": "0xa9059cbb000000000000000000000000899a2f8980b5b3e33885393fa919a651c0029dc80000000000000000000000000000000000000000000000000000000005f5e100",
          "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "calls": [
              {
                  "type": "DELEGATECALL",
                  "from": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                  "to": "0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf",
                  "gas": "0x3be71",
                  "gasUsed": "0x2a4c",
                  "input": "0xa9059cbb000000000000000000000000899a2f8980b5b3e33885393fa919a651c0029dc80000000000000000000000000000000000000000000000000000000005f5e100",
                  "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
                  "index": 10705,
                  "pc": 1680
              }
          ],
          "index": 10583,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xf17e65822b568b3903685a7c9f496cf7656cc6c2",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0xb690",
          "input": "0xa9059cbb00000000000000000000000037d9fb573c96b3d8fcb76ff78ee863df5e2fe38300000000000000000000000000000000000000000000010e5bb0d82561f09400",
          "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "calls": [
              {
                  "type": "DELEGATECALL",
                  "from": "0xf17e65822b568b3903685a7c9f496cf7656cc6c2",
                  "to": "0x95cc3a10636c5bdffe4045d7bf00efb787e1bbe1",
                  "gas": "0x3a54f",
                  "gasUsed": "0x99f6",
                  "input": "0xa9059cbb00000000000000000000000037d9fb573c96b3d8fcb76ff78ee863df5e2fe38300000000000000000000000000000000000000000000010e5bb0d82561f09400",
                  "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
                  "index": 11640,
                  "pc": 983
              }
          ],
          "index": 11507,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x76c2",
          "input": "0xa9059cbb000000000000000000000000a1312ab3f42c6685cb336cceca6d5cb3c492a65d000000000000000000000000000000000000000000000002505515fab5368400",
          "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "index": 12419,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0xe28b3b32b6c345a34ff64674606124dd5aceca30",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x3349",
          "input": "0xa9059cbb000000000000000000000000c5d4ec9300be6da89a3db305c415c7cd3cbb7e8e00000000000000000000000000000000000000000000002c3733e4a5d43c2800",
          "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "index": 13257,
          "pc": 4588
      },
      {
          "type": "CALL",
          "from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
          "to": "0x9e32b13ce7f2e80a01932b42553652e053d6ed8e",
          "value": "0x0",
          "gas": "0x3d090",
          "gasUsed": "0x75de",
          "input": "0xa9059cbb00000000000000000000000094628ae8a0dd6eeefb200a18aaa703dfc8270c7f0000000000000000000000000000000000000000000000022d9060f963390800",
          "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "index": 14055,
          "pc": 4588
      }
  ],
  "index": 0
}
`

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
  // const rinkebyUrl = {
  //   host: 'https://eth-mainnet.blastapi.io/b0ebe560-22bd-437f-a30f-3e6fdeb8ee7b',
  //   path: '/vmtrace?txhash=' + config.demoTransactionHash + '&type=gethtrace2'
  // };
  // use source-code-utils getProcessedInstructionsForBinary to get pc -> source map
  const processor = new traceProcessor([config.demoABI], config.knownAddresses);
  // const vmTrace = await downloadTrace(rinkebyUrl, (html => html('pre').text()));

  const result = await processor.decodeTrace(JSON.parse(trace1));
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

// demo_manualInput();
// demo_knownAddresses();
// demo_multipleContracts();
// demo_customTypes();
demo_rinkeby();
// demo_mainNet();
// Update the IP and Transaction hash before uncommenting this
// demo_privateGethNode();