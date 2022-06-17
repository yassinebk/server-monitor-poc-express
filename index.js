const express = require("express");

const app = express();

app.post("/restart", (req, res) => {
  exec("pm2 reload server.js", (error, stdout, stderr) => {
    if (error) {
      console.log(`error ${error.message}`);
    }
    if (stderr) {
      console.log(`stderr ${stderr}`);
    }
    console.log(stdout);

    return res.json({ stderr, error, stdout });
  });
});

app.post("/deploy-new", (req, res) => {
  return exec(
    "cd /app;  docker-compose kill ; docker-compose pull ;docker-compose up;pm2-runtime start server.js ",
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr ${stderr}`);
      }
      console.log(stdout);
      return res.json({ stderr, error, stdout });
    }
  );
});

app.post("/start", (req, res) => {
  return exec(
    "cd /app;  pm2-runtime start server.js ",
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr ${stderr}`);
      }
      console.log(stdout);
      return res.json({ stderr, error, stdout });
    }
  );
});

app.listen(PORT, () => {
    console.log('monitor server is starting')
})
