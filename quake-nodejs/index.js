const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {URL} = require('url');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', './views');
app.set('view engine', 'ejs');

let data = [];

app.get('/', (req, res) => {
	res.render('index', { data })
});

app.get('/clear', (req, res) => {
    data = [];
    res.sendStatus(200);
});

app.post('/', (req, res) => {
    const msg = req.body.Body.replace('Sent from your Twilio trial account - ', "");
    const loc = new URL(msg).searchParams.get('query').split(",");
    const lat = loc[0];
    const lng = loc[1];
    data.push([req.body.From, lat, lng]);
    console.log(JSON.stringify(data, null, 2));
	res.sendStatus(200);
});

app.listen(PORT);
