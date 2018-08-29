var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dota2api = require('dota2-api');
var cors = require('cors');
var fetch = require('node-fetch');

var da = dota2api.create(process.env.KEY);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.port || 8081;

app.use(cors());

app.get('/', (req, res) => {
	res.json({message: "ayy lmao"})
});

app.get('/getPlayerHistory/:player_id', (req, res) => {
		const options = {account_id: req.params.player_id};
		da.getMatchHistory(options).then((result) => {
			res.json(result);
		}, (errorResponseStatusText) => {
			res.send(errorResponseStatusText);
		});
	})

app.get('/player/:id', (req, res) => {
		fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + process.env.KEY + '&steamids=' + req.params.id).
		then((res)=> {
			return res.json()
		}).
		then((json)=>{
			res.json(json)
		});
	});


app.listen(port);
console.log("live on port: " + port);