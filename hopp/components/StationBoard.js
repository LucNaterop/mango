import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button,Spinner} from 'native-base';
import {Grid, Col, Row} from 'react-native-easy-grid';
import Abfahrt from './Abfahrt.js';
import Datastore from 'react-native-local-mongodb';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
	props: {
		station: {
			'_id': 'dsfl2lj23jl3j4kj5'
			'Zürich, Nürenbergstrasse'
		}
	}
*/

function transformResponseToStationboard(responseData){
	// transforms the stationboard from the server to the state
	var stationboard = [];
	responseData.stationboard.forEach(function(abfahrt){
		var dt = abfahrt.stop.departureTimestamp - new Date().getTime()/1000;
		dt = dt/60;
		dt = Math.round(dt);
		stationboard.push({
			'linie': abfahrt.number, 
			'to': abfahrt.to, 
			'dt': dt,
			'type': abfahrt.category[0]
		});
	});
	return stationboard;
}

export default class StationBoard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'intervalID1': null,
			'intervalId2': null,
			'amount': 4,
			'updated': null,
			'loading': true,
			'lastUpdate': new Date(),
			'stationboard': [
				{'linie':'','to': '', 'dt': ''},
				{'linie':'','to': '', 'dt': ''}
			]
		};
	}
	update(){
		// updates the stationboard with the new data if there is an internet connection
		var that = this;
		var request = "http://transport.opendata.ch/v1/stationboard?station="+this.props.station.name+"&limit=20";
		fetch(request).then(function(response){
			return response.json();
		}).then(function(responseData){
			var stationboard = transformResponseToStationboard(responseData);
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
	componentDidMount(){
		var that = this;
		that.update();
		var id1 = setInterval(function(){
			that.update();
		}, 10000);
		var id2 = setInterval(function(){
			that.setState({ 'updated': Math.floor((new Date() - that.state.lastUpdate)/1000),}, () => {
				that.setState({'loading': that.state.updated > 20});
			});
		}, 5000);
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

		if(this.state.loading){
			// set style of table to loading
			var spinner = (
				<View style={{ justifyContent: 'center', alignItems: 'center'}}>
					<Spinner color='white' style={{position: 'absolute', top: -80, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}/>
				</View>
			);
		}

		var style = {
		  container: {
		  	backgroundColor: 'rgba(22,24,52,1.0)',
		  	borderWidth: 4,
		  	borderRadius: 3,
		  	borderColor: '#fff',
		  	width: '100%',
		  	paddingTop: 20,
		  	marginTop: 30,
		  	opacity: that.state.loading ? 0.3 : 1
		  }
		};

		return (
			<View style={style.container}>
				<View style={{paddingBottom: 5}}>
					{abfahrtList}
				</View>
				{spinner}
				<Icon.Button style={{alignSelf: 'center'}} size={20} name="chevron-down" color="rgba(227,66,53,1.0)" backgroundColor="transparent" onPress={this.onExpand.bind(this)}>
				</Icon.Button>
            </View>
		)
	}
}
