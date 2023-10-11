import Datauri from 'datauri';
import express from 'express';
import http from 'http';
import { JSDOM } from 'jsdom';
import path, { dirname } from 'path';
import SocketIO from 'socket.io';
import { fileURLToPath } from 'url';

// Re-creating __dirname functionality for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

const datauri = new Datauri();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
function setupAuthoritativePhaser() {
  JSDOM.fromFile(path.join(__dirname, 'authoritative_server/index.html'), {
    // To run the scripts in the html file
    runScripts: 'dangerously',
    // Also load supported external resources
    resources: 'usable',
    // So requestAnimatinFrame events fire
    pretendToBeVisual: true,
  })
    .then((dom) => {
      dom.window.URL.createObjectURL = (blob) => {
        if (blob) {
          return datauri.format(
            blob.type,
            blob[Object.getOwnPropertySymbols(blob)[0]]._buffer
          ).content;
        }
      };
      dom.window.URL.revokeObjectURL = (objectURL) => {};
      dom.window.gameLoaded = () => {
        server.listen(8082, function () {
          console.log(`Listening on ${server.address().port}`);
        });
      };
      dom.window.io = io;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

setupAuthoritativePhaser();
