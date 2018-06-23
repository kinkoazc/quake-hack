const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const {URL} = require('url')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.set('views', './views')
app.set('view engine', 'ejs')

const positions = []

app.get('/', (req, res) => {
	res.render('index')
})

app.post('/', (req, res) => {
	let data = {
		messageSID: req.body.MessageSid,
		from: req.body.From,
		body: req.body.Body
	}
	const loc = new URL(data.body).searchParams.get('query').split(",")
	const lat = loc[0]
	const lon = loc[1]
	positions.push({lat, lon})
	console.log(JSON.stringify(positions, null, 2))
	res.sendStatus(200)
})

app.listen(PORT)

