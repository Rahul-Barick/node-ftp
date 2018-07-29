let config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
};
let fs = require('fs');
var PromiseFtp = require('promise-ftp');

//Downloading a file
var ftp = new PromiseFtp();
ftp
  .connect(config)
  .then(function(list) {
    return ftp.get('/home/rahul/IN/ftptestin');
  })
  .then(stream => {
    return new Promise(function(resolve, reject) {
      stream.once('close', resolve);
      stream.once('error', reject);
      stream.pipe(fs.createWriteStream('ftptestin.txt'));
    }).catch(error => {
      return error;
    });
  })
  .then(function() {
    return ftp.end();
  })
  .catch(e => {
    return e;
  });

// Uploading a file
var ftp = new PromiseFtp();
ftp
  .connect(config)
  .then(function(serverMessage) {
    return ftp.put('../upload.txt', '/home/rahul/OUT/upload.txt');
  })
  .then(function() {
    console.log('Hi');
    return ftp.end();
  })
  .catch(e => {
    console.log('Error ' + e);
  });
