const vueCliServiceRegexp = /vue-cli-service\.js$/;
const commandIndex =
  process.argv.findIndex(arg => vueCliServiceRegexp.test(arg)) + 1;

module.exports = commandIndex ? process.argv[commandIndex] === 'serve' : false;
