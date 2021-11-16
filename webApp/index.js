const express = require("express");
const path = require("path");

const app = express();

const homeRouter = require('./routes/home.routes');
const downloadRouter = require('./routes/download.routes');
const datatableRouter = require('./routes/datatable.routes');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.use('/', homeRouter);
app.use('/download', downloadRouter);
app.use('/datatable', datatableRouter);

app.listen(3000);
