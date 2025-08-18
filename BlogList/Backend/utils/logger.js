/* Simple logger that won’t spam tests later if you add API tests */

function info(...args) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(...args)
    }
  }
  
  function error(...args) {
    console.error(...args)
  }
  
  module.exports = { info, error }