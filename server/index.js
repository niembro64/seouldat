import express from 'express';
import http from 'http';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(__dirname, 'public');

const app = express();
const server = http.createServer(app);
const port = Number(process.env.PORT || 8082);

app.use(
  '/vendor/peerjs',
  express.static(path.join(rootDir, 'node_modules', 'peerjs', 'dist'))
);
app.use(express.static(publicDir));

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

server.listen(port, () => {
  console.log(`Listening on ${server.address().port}`);
});
