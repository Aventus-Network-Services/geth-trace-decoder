// This code is inspired by ConseSys abi-decoder (https://github.com/ConsenSys/abi-decoder)

const SolidityCoder = require('web3-eth-abi');
const { sha3, BN } = require("web3-utils");

function decodeCall(_abiItem, _inputData, _outputData, _customTypeMapper) {
  if (_abiItem) {
    let decodedInputResult, decodedOutputResult;

    const inputParameterTypes = getTypes(_abiItem.inputs, _customTypeMapper);
    let decodedInput = SolidityCoder.decodeParameters(inputParameterTypes, _inputData.slice(10));
    decodedInputResult = parseDecodedParams(decodedInput, _abiItem.inputs);

    if (_outputData && _outputData !== '0x') {
      const outputParameterTypes = getTypes(_abiItem.outputs, _customTypeMapper);
      let decodedOutput = SolidityCoder.decodeParameters(outputParameterTypes, _outputData.slice(2));
      decodedOutputResult = parseDecodedParams(decodedOutput, _abiItem.outputs);
    }
    return decodedResult(_abiItem.name, decodedInputResult, decodedOutputResult);
  } else {
    return decodedResult();
  }
}

function getTypes(_params, _customTypeMapper) {
  if (typeof _customTypeMapper == 'function') {
    return _params.map(item => _customTypeMapper(item.name, item.type));
  } else {
    return _params.map(item => item.type);
  }
}

function parseDecodedParams(_decodedData, _abiParams) {
  const decodedParams = _abiParams.map(function (abiParam, index) {
    return {
      name: abiParam.name,
      value: getParameterValue(_decodedData[index], abiParam.type),
      type: abiParam.type
    }
  });
  return decodedParams;
}

function getParameterValue(_value, _type) {
  const isUint = _type.indexOf('uint') == 0;
  const isInt = _type.indexOf('int') == 0;

  if (isUint || isInt) {
    const isArray = Array.isArray(_value);

    if (isArray) {
      _value = _value.map(val => new BN(val).toString());
    } else {
      _value = new BN(_value).toString();
    }
  }
  return _value;
}

function decodedResult(_methodName, _inputParams, _outputParams) {
  return {
    methodName: _methodName || '',
    decodedInput: _inputParams || [],
    decodedOutput: _outputParams || []
  };
}

module.exports = {
  decodeCall,
  decodedResult
};