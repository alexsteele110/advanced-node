const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const { accessKeyId, secretAccessKey } = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const Key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'blogster-bucket-898',
        ContentType: 'jpeg',
        Key
      },
      (err, url) => res.send({ Key, url })
    );
  });
};
