const webshot = require('webshot');
const path = require('path');

const link = 'https://www.mariowiki.com/Mario';
 
webshot(link, path.resolve('screenshots', 'mario.png'), function(err) {
  // screenshot now saved to google.png,
  // in directory where it was run not where script is
  err && console.log('Webshot Error:', err);
});