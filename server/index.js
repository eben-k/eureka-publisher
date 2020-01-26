import express from 'express';
import cors from 'cors';
import http from 'http';
import falcorExpress from 'falcor-express';
import falcorRouter from 'falcor-router';

import routes from './routes';

const app = express();
app.server = http.createServer(app);

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
  return new falcorRouter(routes);
}))

app.use(express.static('dist'));

app.get('/', (req, res) => res.send('Publisher App Initial Application!'));

app.server.listen(process.env.PORT || 8000);
console.log(`Started on port ${app.server.address().port}`);

export default app;
