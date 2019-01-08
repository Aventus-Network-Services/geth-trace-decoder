const Web3 = require('web3');
const decoder = require('./callDecoder');
const traceGetter = require('./traceGetter');

class traceProcessor {
  // _contractAbis must be an array of {Name, abi} objects
  // _contractNames (optional) must be a dictionary of address => contractName
  // _customTypeMapper (optional) function to map custom types to primitive solidity types
  constructor(_contractAbis, _contractNames, _customTypeMapper) {
    this.abiDescriptor = {};
    this.decodedResult = [];

    this.contractNames = _contractNames || {};
    this.customTypeMapper = _customTypeMapper;

    _contractAbis.forEach(function(contractAbi) {
      this.parseAbiDescriptor(contractAbi);
    }.bind(this));
  }

  decodeTrace(_traceJson, _node, _transactionHash) {
    if (!_traceJson && (!_node || !_transactionHash)) {
      throw 'traceJson or node and transactionHash must be specified';
    }

    if (!_traceJson) {
      _traceJson = traceGetter.getTrace(_node, _transactionHash);
    }

    this.decodeTraceRec(_traceJson, 0);
    return this.decodedResult;
  }

  decodeTraceRec(_callObj, _level) {
    this.decodedResult.push(this.decodeCall(_callObj, this.customTypeMapper, _level));

    if (!_callObj.calls) return;

    _callObj.calls.forEach(call => {
      this.decodeTraceRec(call, _level + 1);
    });
  }

  decodeCall(_callObj, _customTypeMapper, _level) {
    let abiDescriptor = this.abiDescriptor[_callObj.input.slice(2, 10)];
    if (!abiDescriptor) {
      return this.buildDecodedCallResult(decoder.decodedResult(), _callObj, _level, true);
    }

    let decodedCall = decoder.decodeCall(abiDescriptor.abiItem, _callObj.input, _callObj.output, _customTypeMapper);

    return this.buildDecodedCallResult(decodedCall, _callObj, _level);
  }

  buildDecodedCallResult(_decodedCall, _callObj, _level, _decodeError) {
    let decodedCallMetadata = {};

    decodedCallMetadata['level'] = _level;
    decodedCallMetadata['from'] = _callObj.from;
    decodedCallMetadata['to'] = _callObj.to;
    decodedCallMetadata['fromContractName'] = this.contractNames[_callObj.from] || '';
    decodedCallMetadata['toContractName'] = this.contractNames[_callObj.to] || '';

    _decodedCall = Object.assign({}, decodedCallMetadata, _decodedCall);

    _decodedCall['error'] = _callObj.error || '';
    _decodedCall['decodeError'] = _decodeError ? `Unable to decode call, no abi found for this input (${_callObj.input})` : '';

    return _decodedCall;
  }

  parseAbiDescriptor (_abiDescriptor) {
    if (!Array.isArray(_abiDescriptor.abi)) {
      throw new Error('ABI must be an array, got ' + typeof _abiDescriptor.abi);
    }

    _abiDescriptor.abi.forEach(function (abiItem) {
      if (abiItem.name) {
        const signature = new Web3().sha3(abiItem.name + '(' + abiItem.inputs.map(function(input) {return input.type;})
          .join(',') + ')');
        const methodId = signature.slice(2, 10);
        this.abiDescriptor[methodId] = {
          abiItem: abiItem
        };
      }
    }.bind(this));
  }

}

module.exports = traceProcessor;