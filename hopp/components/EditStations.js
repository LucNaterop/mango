import React from 'react';
import Datastore from 'react-native-local-mongodb';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {List} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SwipeableEntry from './SwipeableEntry.js';
import AddStationButton from './AddStationButton.js';
import Events from 'react-native-simple-events';

/*
	props: {
		navigator: navigator
	}
*/

export default class EditStations extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'myStations': []
		}
		var db = new Datastore({ filename: 'myStations', autoload: true });
		db.find({}, (error, docs) => {
			this.setState({
				'myStations': docs
			});
		});
	}
	update(){
		// update state with new docs
		var db = new Datastore({ filename: 'myStations', autoload: true });
		db.find({}, (error, docs) => {
			this.setState({
				'myStations': docs
			});
		})
	}
	onPressBack(){
		this.props.navigator.pop();
		Events.trigger('comingBackToHome');
	}
	render(){
		var that = this;
		var myStations = that.state.myStations;
		if(myStations[0]){
			myStations[0].isFirst = true;
		}
		var myStations = that.state.myStations.map(station => (
			<SwipeableEntry station={station} updateParent={that.update.bind(that)} key={station._id}/>
		));
		return (
			<View style={{flex: 1, backgroundColor: 'rgba(163, 207, 246, 1.0)'}}>
				<View style={{flex: 9}}>
					<ScrollView style={{flex: 10, paddingTop: 20, padding: 3 }}>
						<View style={{borderWidth: 4, borderColor: '#fff', borderRadius: 4}}>
							{myStations}
						</View>
						<AddStationButton navigator={that.props.navigator}/>
					</ScrollView>
				</View>
				<View style={{'backgroundColor': 'rgba(0, 0, 0, 0.8)', flex: 1}}>
					<Icon.Button style={{marginLeft: 10, marginTop: 4}} size={25} name="chevron-down" color="rgba(227,66,53,1.0)" backgroundColor="transparent" onPress={this.onPressBack.bind(this)}>
					</Icon.Button>
				</View>
			</View>
		)
	}
	componentDidMount(){
		var that = this;
		Events.on('databaseChanged', 'editStationsListener', () => {
			that.update();
		});
	}
    componentWillUnmount() {
    	Events.rm('databaseChanged', 'editStationsListener');
    }
}


