const webshot = require('webshot');
const path = require('path');
const fs = require('fs');

// const link = 'https://www.mariowiki.com/Mario';
 
// webshot(link, path.resolve('screenshots', 'mario.png'), function(err) {
//   // screenshot now saved to google.png,
//   // in directory where it was run not where script is
//   err && console.log('Webshot Error:', err);
// });

// Generates screenshots from links if not made already
exports.createScreenshots = (req, res, next) => {
  const portfolio = req.body.portfolio;

  if (!portfolio) return res.status(400).send('No portfolio links provided');

  portfolio.forEach((entry) => {
    // exclude empty links
    const link = entry && entry.url;
    if (!link) return;

    // attempt to create photo from link
    const renderStream = webshot(link);
    const file = fs.createWriteStream(path.resolve('screenshots', link + '.png'), {
      encoding: 'binary',
    });

    file.on('open', (fd) => { 
      // allow read stream to start writing to new file once open
      renderStream
        .on('data', data => file.write(data.toString('binary'), 'binary'))
        .on('end')
    });
    file.on('error', err => { throw err });

    renderStream.on('error', err => console.log('Webshot error:', err))
  });

  next();
}