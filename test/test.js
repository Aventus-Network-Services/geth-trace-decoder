const assert = require('assert');
const config = require('../publicDemo/config.json');
const traceProcessor = require('../lib/traceProcessor');

function mapStringToAddress(_paramName, _paramType) {
  if (_paramType == 'string') return 'address';
  return _paramType;
}

describe('Decoding geth trace', function() {
  it('can decode a simple call trace', function() {
    const processor = new traceProcessor([config.demoABI]);
    const result = processor.decodeTrace(config.demoVmTrace)[0];

    assert.equal(result.from, '0x1b185002395904310c2f116060cbaeccebba9b7f');
    assert.equal(result.to, '0x34dcd85470cc9a6a836f97fd4770736b74f7adf6');
    assert.equal(result.methodName, 'testMethod');

    // inputs
    assert.equal(result.decodedInput.length, 3);
    assert.equal(result.decodedInput[0].name, '_firstParam');
    assert.equal(result.decodedInput[0].value, '1');
    assert.equal(result.decodedInput[0].type, 'uint256');
    assert.equal(result.decodedInput[1].name, '_secondParam');
    assert.equal(result.decodedInput[1].value, '2');
    assert.equal(result.decodedInput[1].type, 'uint256');
    assert.equal(result.decodedInput[2].name, '_description');
    assert.equal(result.decodedInput[2].value, 'Test string');
    assert.equal(result.decodedInput[2].type, 'string');

    // outputs
    assert.equal(result.decodedOutput.length, 1);
    assert.equal(result.decodedOutput[0].name, 'result_');
    assert.equal(result.decodedOutput[0].value, false);
    assert.equal(result.decodedOutput[0].type, 'bool');

    // errors
    assert.equal(result.error, '');
    assert.equal(result.decodeError, '');
  });

  it('can handle decode errors', function() {
    const callTrace = {
      "type": "CALL",
      "from": "0x1b185002395904310c2f116060cbaeccebba9b7f",
      "to": "0x34dcd85470cc9a6a836f97fd4770736b74f7adf6",
      "value": "0x0",
      "gas": "0x630d5d",
      "gasUsed": "0x9fe1",
      "input": "0x123456789",
      "output": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "time": "2.322234ms"
    };

    const processor = new traceProcessor([config.demoABI]);
    const result = processor.decodeTrace(callTrace)[0];

    assert.equal(result.error, '');
    assert.equal(result.decodeError.indexOf('Error decoding method'), 0);
  });

  it('can map types', function() {
    const processor = new traceProcessor([config.demoABI], null, mapStringToAddress);
    const result = processor.decodeTrace(config.demoVmTrace)[0];

    assert.equal(result.decodedInput[2].name, '_description');
    assert.equal(result.decodedInput[2].value, '0x0000000000000000000000000000000000000060');
    assert.equal(result.decodedInput[2].type, 'string');
    assert.equal(result.error, '');
    assert.equal(result.decodeError, '');
  });

  it('can show known addresses', function() {
    const processor = new traceProcessor([config.demoABI], config.knownAddresses);
    const result = processor.decodeTrace(config.demoVmTrace)[0];

    assert.equal(result.fromContractName, 'MyAccount');
    assert.equal(result.toContractName, 'TestContract');
    assert.equal(result.error, '');
    assert.equal(result.decodeError, '');
  });

});