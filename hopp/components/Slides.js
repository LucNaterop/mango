import React from 'react';
import Datastore from 'react-native-local-mongodb';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import StationSlide from './StationSlide.js';
import Events from 'react-native-simple-events';
import {Button, Title,Footer} from 'native-base';

/*
	props: {
		navigator: navigator
	}
*/

function doMyStationsFixtures(component){
	var db = new Datastore({ filename: 'myStations', autoload: true });
	db.find({}, function(error,docs){
		if(docs.length == -1){
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
		});
	}
	renderSwiper(){
		var myStations = this.state.myStations.map(station => <StationSlide station={station} key={station._id} />);
		var swiperHeight = Dimensions.get('window').height-90;
		return (
			<Swiper 
				style={{overflow: 'visible'}}
				showsButtons={false} 
				loop={false} 
				height={swiperHeight}
				dotStyle={{'backgroundColor': 'rgba(256,256,256,1.0)', 'height': 7, 'width': 7, 'borderRadius': 7}}
				activeDotStyle={{'backgroundColor': 'rgba(227,66,53,1.0)', 'height': 10, 'width': 10, 'borderRadius': 10}}
			>
				{myStations}
			</Swiper>

		);
	}
	renderNewComerInfo(){
		return (
			<View style={{padding: 20, paddingTop: 100}}>
				<Text style={{color: '#fff', fontSize: 30, fontWeight: '600', textAlign: 'center'}}>
					Drücke unten auf {'\n'}
					<Icon name="ios-menu" size={40} backgroundColor="transparent" color="rgba(227,66,53,1.0)" /> {'\n'}
					um deine Stationen hinzuzufügen </Text>
			</View>
		);
	}
	render(){
		var that = this;
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 10}}>
					{this.state.myStations.length > 0 ? this.renderSwiper() : this.renderNewComerInfo()}
				</View>
				<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', 'backgroundColor': 'rgba(30, 30, 30, 1)', height: 100 }} > 
					<View style={{flex: 1, flexDirection: 'row', paddingLeft: 10}}>
					</View>
					<View style={{flex: 1, alignItems: 'flex-end'}}>
						<Icon.Button name="ios-menu" size={40} backgroundColor="transparent" color="rgba(227,66,53,1.0)" onPress={this.onPressIcon.bind(this)}>
						</Icon.Button>
					</View>
				</View>
			</View>
		);
	}
	componentDidMount(){
		var that = this;
		Events.on('comingBackToHome', 'slidesListener', () => {
			that.update();
		});
	}
    componentWillUnmount() {
    	Events.rm('comingBackToHome', 'slidesListener');
    }
}


