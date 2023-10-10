// @ts-ignore
import express from 'express';
const app = express();
// @ts-ignore
const server = require('http').Server(app);
// @ts-ignore
app.use(express.static(__dirname + '/public'));
// @ts-ignore
app.get('/', function (req, res) {
  // @ts-ignore
  res.sendFile(__dirname + '/index.html');
});
server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});
