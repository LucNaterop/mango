import React from 'react';
import {View} from 'react-native';
import {H1, Container, Content, Card, CardItem, Text, Button, Icon} from 'native-base';
import {Grid, Col, Row} from 'react-native-easy-grid';
import Datastore from 'react-native-local-mongodb';

import Abfahrt from './Abfahrt';
import StationsTafel from './StationsTafel';

export default class Abfahrtstafel extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'amount': 4,
			'updated': null,
			'lastUpdate': new Date(),
			'stationboard': [
				{'linie':'','to': '...lade...', 'dt': ''},
				{'linie':'','to': '', 'dt': ''},
				{'linie':'','to': '', 'dt': ''},
				{'linie':'','to': '', 'dt': ''}
			]
		};
	}

	update(){
		var that = this;
		var request = "http://transport.opendata.ch/v1/stationboard?station="+this.props.name+"&limit=20";
		fetch(request).then(function(response){
			return response.json();
		}).then(function(responseData){
			var stationboard = [];
			responseData.stationboard.forEach(function(abfahrt){
				var dt = abfahrt.stop.departureTimestamp- new Date().getTime()/1000;
				dt = dt/60;
				dt = Math.round(dt);
				stationboard.push({'linie': abfahrt.number, 'to': abfahrt.to, 'dt': dt});
			});
			that.setState({
				'stationboard': stationboard,
				'lastUpdate': new Date(),
			});
		}).catch(function(error){
			console.log(error);
		});
	}

	onExpand(){
		this.setState({ 'amount': this.state.amount+1 });
	}

	onDelete(){
		var that = this;
		var db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
		db.remove({'_id': this.props.id}, function(){
			that.props.updateAppState();
		});
	}

	componentDidMount(){
		var that = this;
		that.update();
		var id1 = setInterval(function(){
			that.update();
		}, 10000);
		var id2 = setInterval(function(){
			that.setState({
				'updated': Math.floor((new Date() - that.state.lastUpdate)/1000),
			});
		}, 1000);
		this.setState({'intervalID1': id1, 'intervalID2': id2});
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalID1);
		clearInterval(this.state.intervalID2);
	}

	render(){
		var that = this;
		var stationboard = this.state.stationboard;
		stationboard = stationboard.filter(function(e){
			return e.dt >= 0;
		});
		
		var abfahrtList = stationboard.slice(0,this.state.amount).map((abfahrt) => <Abfahrt abfahrt={abfahrt} key={Math.random()} />);
		
		var style = {
			'backgroundColor': '#331805',
			'borderColor': '#ddd',
			'borderTopWidth': 25,
			'borderRightWidth': 5,
			'borderBottomWidth': 25,
			'borderLeftWidth': 5,
			'margin': 0,
			'paddingTop': 10,
			'paddingBottom': 10,
			'shadowRadius': 4,
			'shadowOpacity': 0.3,
			'shadowOffset': {'width': 1, 'height': 1}
		};

		if(this.props.editing){ 
			var deleteButton = (
				<Button danger bordered onPress={that.onDelete.bind(this)} style={{alignSelf: 'center'}}>
					<Icon name='ios-trash-outline'/> Löschen
				</Button>
			);
		}


		return (
			<View>
				<Text style={{'textAlign': 'right', 'marginRight': 10, 'marginTop': 20, 'color': '#ccc'}}>aktualisiert vor {this.state.updated}s</Text>
				<StationsTafel name={this.props.name} />
				<Grid style={style}>
					{abfahrtList}
					<Row></Row>
					<Row></Row>
	            </Grid>
				<Button transparent style={{'alignSelf': 'center', 'marginTop': -27}} onPress={this.onExpand.bind(this)}>
					<Icon name='ios-arrow-down' style={{'color':'#aaa'}}/>
				</Button>
				{deleteButton}
            </View>
		)
	}
}