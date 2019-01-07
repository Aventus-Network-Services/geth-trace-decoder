const colors = require('colors/safe');
const maxHexLength = 22;

function format(_data) {
  let output = '';
  let callerMap = buildcallerMap(_data);

  _data.forEach( (_decodedCall, index) => {
    let prefix = makePrefix(callerMap[index]);
    let callSummary;

    if (_decodedCall.error) {
      callSummary = formatTxError(_decodedCall);
    } else if (_decodedCall.decodeError) {
      callSummary = formatDecodingError(_decodedCall);
    } else {
      callSummary = formatSuccessfulCall(_decodedCall);
    }

    output += [prefix, callSummary].join('')+'\n';
  });

  return output;
}

// Each position in the map for one call indicates whether the ancestor of this call at that level makes another call later
function buildcallerMap(_data) {
  let i;
  let ancestorMaps = {};
  let currentMap = [];
  for (i = _data.length - 1; i >= 0; i--) {
    let callDetails = _data[i];
    let callLevel = callDetails.level;
    if (callLevel >= currentMap.length) {
      currentMap[currentMap.length-1] = false;
      for (let j = currentMap.length; j < callLevel; j++) {
        currentMap.push(true);
      }
    } else {
      currentMap.pop();
    }
    ancestorMaps[i] = currentMap.slice(0); // shallow copies array
  }
  return ancestorMaps;
}

function makePrefix(_ancestorMap) {
  if (_ancestorMap.length === 0) return '';

  let prefix = '';
  let [listAncestorMap, tailIsLastInLevel] = extractArrayTail(_ancestorMap);
  listAncestorMap.forEach(lastCallInLevel => prefix += (lastCallInLevel) ? '    ' : '│   ');
  prefix += (tailIsLastInLevel) ? '└───' : '├───';
  return colors.grey.bold(prefix);
}

function extractArrayTail(_arr) {
  return [_arr.slice(0, _arr.length - 1), _arr[_arr.length - 1]];
}

function formatTxHeader(_decodedCall) {
  return `${colors.grey.bold(_decodedCall.fromContractName || _decodedCall.from || '[unknown]')} -> ` +
  `${colors.grey.bold(_decodedCall.toContractName || _decodedCall.to)}`;
}

function formatTxError(_decodedCall) {
  const spaces = ' '.repeat(_decodedCall.level * 4);
  return formatSuccessfulCall(_decodedCall) + '\n' + spaces + `${colors.red.bold('**Error**: ' + _decodedCall.error)}`;
}

function formatDecodingError(_decodedCall) {
  const spaces = ' '.repeat(_decodedCall.level * 4);
  return `${formatTxHeader(_decodedCall)}\n${spaces}${colors.bold.red(compactString(_decodedCall.decodeError))}`;
}

function formatSuccessfulCall(_decodedCall) {
  return `${formatTxHeader(_decodedCall)}.${parseDecodedData(_decodedCall)}`;
}

function compactString(s) {
  let output = s;
  let hexStrings = s.match(/0x[0-9a-fA-F]*/g);
  hexStrings.forEach(hexString => {
    if (hexString.length > maxHexLength) {
      output = output.replace(hexString, hexString.slice(0,maxHexLength) + '[...]');
    }
  });
  return output;
}

function parseDecodedData(_decodedCall) {
  const methodName = colors.cyan(_decodedCall.methodName);
  let input = '';
  let output = '';

  if (_decodedCall.decodedInput && _decodedCall.decodedInput.length > 0) {
    input = _decodedCall.decodedInput.map(p => colors.yellow((p.name||'_') + ': ') + p.value.toString()).join(', ');
  } else {
    input = colors.yellow('[') + 'No input' +  colors.yellow(']');
  }

  if (_decodedCall.decodedOutput && _decodedCall.decodedOutput.length > 0) {
    output = '[' + _decodedCall.decodedOutput.map(p => colors.green((p.name||'_') + ': ') + p.value.toString()).join(', ') + ']';
  } else {
    output = colors.green('[') + 'No output' +  colors.green(']');
  }

  return methodName + `(${input}${colors.cyan(')')} ${output}`;
}

module.exports = {
  format
};
