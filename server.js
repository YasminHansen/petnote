const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
 
app.use(express.static(`dist/PetNote`));
 
app.get('/*', (req, res) => {
res.sendFile('dist/Petnote/index.html', { root: __dirname });
});
 
app.listen(process.env.PORT || 8080);