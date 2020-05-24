const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
 
app.use(express.static(`${__dirname}/dist/${nomeApp}`));
 
// app.get('/*', (req, res) => {
// res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
// });

app.get('*', (req, res) => {
    res.sendFile(`./dist/${nomeApp}/index.html`); // load the single view file (angular will handle the page changes on the front-end)
});
 
app.listen(process.env.PORT || 8080);