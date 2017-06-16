const webshot = require('webshot');
const path = require('path');

// const link = 'https://www.mariowiki.com/Mario';
 
// webshot(link, path.resolve('screenshots', 'mario.png'), function(err) {
//   // screenshot now saved to google.png,
//   // in directory where it was run not where script is
//   err && console.log('Webshot Error:', err);
// });

// Generates screenshots from links if not made already
exports.createScreenshots = (req, res, next) => {
  const portfolioLinks = req.body.portfolio;

  if (!portfolioLinks) return res.status(400).send('No portfolio links provided');

  portfolioLinks.forEach((link) => {
    // attempt to create photo from link
    webshot(link, path.resolve('screenshots', link + '.png'), function(err) {
      err && console.log('Webshot Error:', err);
    });
  });

  next();
}