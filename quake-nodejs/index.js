const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const {URL} = require('url')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.set('views', './views')
app.set('view engine', 'ejs')

let data = [
    ['0741111111', 44.4368, 26.1025],
    ['0742222222', 44.4568, 26.1039],
    ['0743333333', 44.4668, 26.1135],
    ['0744444444', 44.4768, 26.1224],
    ['0745555555', 44.4868, 26.1312],
    ['0746666666', 44.4968, 26.1434],
    ['0747777777', 44.4598, 26.1511],
    ['0748888888', 44.4548, 26.1601]
]

app.get('/', (req, res) => {
	res.render('index', { data })
})

app.get('/clear', (req, res) => {
    data = []
    res.sendStatus(200)
})

app.post('/', (req, res) => {
    console.log(req.body) 
    const msg = req.body.Body.replace('Sent from your Twilio trial account - ', "")
    const loc = new URL(msg).searchParams.get('query').split(",")
    const lat = loc[0]
    const lng = loc[1]
    data.push([
        req.body.From, lat, lng
    ])
    console.log(JSON.stringify(data, null, 2))
	res.sendStatus(200)
})

app.listen(PORT)

