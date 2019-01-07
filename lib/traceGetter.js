const Web3 = require('web3');

// This requires that debug module is available in rpc mode.
// *** IMPORTANT *** - Make sure you understand the security implications before enabling rpc
// If your node does not support rpc connections, run admin.startRPC(<IP ADDRESS>, <PORT NUMBER>, <CORS>, <MODULES>") via ipc
// If your node support rpc connection, but debug is not available, restart RPC by adding 'debug' to the modules list

function rpcConnect(_node) {
  let web3Instance = new Web3(new Web3.providers.HttpProvider(_node));
  web3Instance = extendWeb3(web3Instance);

  const modules = web3Instance.admin.listModules();
  if (!modules['debug']) {
    let error = ` Your node is not configured to show debug information via rpc.
      Available modules: ${Object.keys(modules).join(', ')}`;
    error += `\n
 *** IMPORTANT *** - Make sure you understand the security implications before changing your rpc settings
   To show debug information, connect via IPC, stop RPC and start again by adding 'debug' to the modules list.
   example:
      to stop rpc  - admin.stopRPC()
      to start rpc - admin.startRPC("x.x.x.x", 8545, "", "eth,net,web3,debug")
   see: https://github.com/ethereum/go-ethereum/wiki/Management-APIs#admin_startrpc for more details`;

    throw error;
  }

  return web3Instance;
}

function extendWeb3(_web3Instance) {
  _web3Instance.extend({
    property: 'debug',
    methods: [{
      name: 'traceTransaction',
      call: 'debug_traceTransaction',
      params: 2
    }]
  });

  _web3Instance.extend({
    property: 'admin',
    methods: [{
      name: 'listModules',
      call: 'rpc_modules',
      params: 0
    }]
  });

  return _web3Instance;
}

function getTrace(_node, _transactionHash) {
  const web3 = rpcConnect(_node);
  return web3.debug.traceTransaction(_transactionHash, {tracer: 'callTracer', reexec: 5000});
}

module.exports = getTrace;