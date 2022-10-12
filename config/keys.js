// keys.js - figure out what set of credentials to return
if(process.env.NODE_ENV === 'production') {
  // we are in production return the prod set of keys
  module.exports = require('./prod')
} else {
  // we are in development return the dev keys !!!
  module.exports = require('./dev')
}


// mongodb+srv://tezaswi_raj_prod:gdJFldtralCwYiaV@cluster0.gtu8mb1.mongodb.net/emailyproddb?retryWrites=true&w=majority
// googleClientIdProd: "205675035718-ihbifu631lvmpcsqieulde7p1a3nikdo.apps.googleusercontent.com"
// googleClientSecretProd: "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"

