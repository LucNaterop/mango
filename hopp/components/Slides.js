import React from 'react';
import Datastore from 'react-native-local-mongodb';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import StationSlide from './StationSlide.js';
import Events from 'react-native-simple-events';

/*
	props: {
		navigator: navigator
	}
*/

function doMyStationsFixtures(component){
	var db = new Datastore({ filename: 'myStations', autoload: true });
	db.find({}, function(error,docs){
		if(docs.length == 0){
			alert('no docs detected, doing fixtures');
			db.insert([
				{'name': 'Zürich, Nürenbergstrasse', 'amount': 4},
				{'name': 'Zürich, Schaffhauserplatz', 'amount': 4}
			], function(error, docs){
				component.setState({'myStations': docs});
			});
		}
	});
}

export default class Slides extends React.Component {
	constructor(props){
		super(props);
		var that = this;
		that.state = {
			'myStations': []
		};
		var db = new Datastore({ filename: 'myStations', autoload: true });
		db.find({}, function(error,docs){
			that.setState({'myStations': docs})
		});
	}
	componentWillMount(){
		doMyStationsFixtures(this);
	}
	onPressIcon(){
		var that = this;
		that.props.navigator.push({name: 'editStations'});
	}
	update(){
		// update state with new docs
		var that = this;
		var db = new Datastore({ filename: 'myStations', autoload: true });
		db.find({}, function(error,docs){
			that.setState({'myStations': docs})
			alert(JSON.stringify(that.state.myStations));
		});
	}
	render(){
		var that = this;
		var swiperWidth = Dimensions.get('window').width - 20;
		var myStations = that.state.myStations.map(station => <StationSlide station={station} key={station._id} />);
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 15}}>
					<Text>What is going on</Text>
					<Swiper showsButtons={false} width={swiperWidth} loop={false}>
						{myStations}
					</Swiper>
				</View>
				<View style={{'backgroundColor': 'rgba(0, 0, 0, 0.8)', flex: 1, flexDirection: 'row', paddingTop: 10}}>
					<View style={{flex: 6}}>
					</View>
					<View style={{flex: 1}}>
						<Icon.Button name="ios-menu" backgroundColor="transparent" onPress={this.onPressIcon.bind(this)}>
						</Icon.Button>
					</View>
				</View>
			</View>
		);
	}
	componentDidMount(){
		var that = this;
		Events.on('databaseChanged', 'slidesListener', () => {
			that.update();
		});
	}
    componentWillUnmount() {
    	Events.rm('databaseChanged', 'slidesListener');
    }
}


