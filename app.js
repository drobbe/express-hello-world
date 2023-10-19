import express from 'express';
import { extract } from '@extractus/article-extractor';
import axios from 'axios';
import * as rn from 'random-number';
import { setTimeout } from 'timers/promises';

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`;

function createServerDummy() {
  const app = express();
  const port = process.env.PORT || 3001;

  app.get('/', async (req, res) => {
    await makeRequest({
      title: 'Esto es una prueba 👻👻👻',
      content: 'Si esta arriba el servicio',
    });
    res.type('html').send(html);
  });

  const server = app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
  );

  server.keepAliveTimeout = 120 * 1000;
  server.headersTimeout = 120 * 1000;

  return server;
}

async function start() {
  let count = 1;
  const input = 'https://coleccionsolo.com/visits/';
  const article = await extract(input);
  let countOriginalPara = article.content.match(/<p>(.*?)<\/p>/g).length;
  createServerDummy();

  while (true) {
    try {
      const article = await extract(input);

      let countNewPara = article.content.match(/<p>(.*?)<\/p>/g).length;

      if (countNewPara !== countOriginalPara) {
        makeRequest({
          title: 'Si consiguio 👌👌👌',
          content: 'Ha conseguido nueva información apresurate !!!!!!!',
        });
      } else {
        makeRequest({
          title: 'No consiguio 🦗🦗🦗',
          content: 'Nade nuevo tristemente',
        });
      }
      const gen = rn.generator({
        min: 900000,
        max: 1800000,
        integer: true,
      });

      // const gen = rn.generator({
      //   min: 60000,
      //   max: 80000,
      //   integer: true,
      // });
      const interval = gen();

      if (count % 5 === 0) countOriginalPara = countNewPara;
      count++;
      await setTimeout(interval);
    } catch (err) {
      console.error(err);
    }
  }
}

async function makeRequest(data) {
  const { title, content } = data;
  try {
    const response = await axios.get(
      `http://xdroid.net/api/message?k=k-7fe7f460e65b&t=${encodeURI(
        title
      )}&c=${encodeURI(content)}&u=https%3A%2F%2Fcoleccionsolo.com%2Fvisits%2F`
    );
    console.log(response.statusText);
  } catch (error) {
    console.error(error);
  }
}

start();
