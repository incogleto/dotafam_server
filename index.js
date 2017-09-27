var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dota2api = require('dota2-api');
var cors = require('cors');
var fetch = require('node-fetch');

var da = dota2api.create('CB09A4263E19B8840A703598EF4A4741');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.port || 8081;

var router = express.Router();

router.get('/', (req, res) => {
	res.json({message: "ayy lmao"})
});

router.route('/getPlayerHistory/:player_id').
	get((req, res) => {
		const options = {account_id: req.params.player_id};
		da.getMatchHistory(options).then((result) => {
			res.json(result);
		}, (errorResponseStatusText) => {
			res.send(errorResponseStatusText);
		});
	})

router.route('/player/:id').
	get((req, res) => {
		fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=CB09A4263E19B8840A703598EF4A4741&steamids=' + req.params.id).
		then((res)=> {
			return res.json()
		}).
		then((json)=>{
			res.json(json)
		});
	});

app.use('/api', router);

app.listen(port);
console.log("live on port: " + port);