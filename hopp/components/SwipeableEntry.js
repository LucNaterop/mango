import React from 'react';
import {View, Text} from 'react-native';
import Datastore from 'react-native-local-mongodb';
import Swipeout from 'react-native-swipe-out';
import StationTitle from './StationTitle.js';
import Events from 'react-native-simple-events';

/*
	props: {
		station: {
			'_id': 'dsfl2lj23jl3j4kj5'
			'Zürich, Nürenbergstrasse'
		},
		updateParent: function() {...}
	}
*/

export default class SwipeableEntry extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		var that = this;
		var swipeButtons = [
			{
				component: <Text> x </Text>,
				onPress: function(){
					var db = new Datastore({ filename: 'myStations', autoload: true });
					db.remove({'_id': that.props.station._id}, function(error, amountRemoved){
						that.props.updateParent();
						Events.trigger('databaseChanged');
					});
				}
			}
		];
		return (
			<Swipeout right={swipeButtons}>
				<StationTitle station={that.props.station} />
			</Swipeout>
		);
	}
}