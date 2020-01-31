import express from 'express';
import cors from 'cors';
import http from 'http';
import falcorExpress from 'falcor-express';
import falcorRouter from 'falcor-router';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as hist from 'history';


import routes from './routes';
import rootReducer from '../src/reducers';
import reactRoutes from '../src/routes';
import fetchServerSide from './fetchServerSide';

const app = express();
app.server = http.createServer(app);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('dist'));

app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
  return new falcorRouter(routes);
}))

let handleServerSideRender = (req, res, next) => {
  try {
    let initMOCKstore = fetchServerSide();
    const store = createStore(rootReducer, initMOCKstore);
    const location = hist.createLocation(req.path);

    const context = {
      contextFunc: () => ({
        routes: reactRoutes,
        location: location,
      }, (err, redirectLocation, renderProps) => {
        if (redirectLocation) {
          res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (err) {
          console.log(err);
          next(err);
        } else if (renderProps === null) {
          res.status(404).send('Not found');
        } else {
          if (typeof renderProps === 'undefined') {
            return;
          }
        }
      }),
    }
    let html = renderToStaticMarkup(
      <Provider store={store}>
        <StaticRouter location={location} context={context} />
      </Provider>
    );
    const initialState = store.getState()
    let fullHTML = renderFullPage(html, initialState);
    res.send(fullHTML);
  } catch (error) {
    next(error)
  }
};

let renderFullPage = (html, initialState) => {
  return `
  <!doctype html>
  <html>
  <head>
  <title>Publisher App Rendered Server Side</title>
  </head>
  <body>
  <h1>Server side publisher app</h1>
  <div id="publisherAppRoot">${html}</div>
  <script>
  window.__INITIAL_STATE__=${JSON.stringify(initialState)}
  </script>
  <script src="/static/app.js"></script>
  </body>
  </html>`
};

app.use(handleServerSideRender);


app.get('/', (req, res) => res.send('Publisher App Initial Application!'));

app.server.listen(process.env.PORT || 8000);
console.log(`Started on port ${app.server.address().port}`);

export default app;
