import React from 'react';
import Datastore from 'react-native-local-mongodb';
import {View, Text} from 'react-native';
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
	}
	render(){
		var that = this;
		var myStations = that.state.myStations.map(station => (
			<SwipeableEntry station={station} updateParent={that.update.bind(that)} key={station._id}/>
		));
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 10}}>
					{myStations}
					<AddStationButton navigator={that.props.navigator}/>
				</View>
				<View style={{'backgroundColor': 'rgba(0, 0, 0, 0.8)', flex: 1, padding: 10}}>
					<Icon.Button name="chevron-down" backgroundColor="transparent" onPress={this.onPressBack.bind(this)}>
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




