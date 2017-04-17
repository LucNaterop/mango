import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Datastore from 'react-native-local-mongodb';
import Swipeout from 'react-native-swipe-out';
import StationTitle from './StationTitle.js';
import Events from 'react-native-simple-events';
import Icon from 'react-native-vector-icons/Entypo';

/*
	props: {
		station: {
			'_id': 'dsfl2lj23jl3j4kj5'
			'Zürich, Nürenbergstrasse'
		},
		updateParent: function() {...}
	}
*/

var styles = StyleSheet.create({
  container: {
  	backgroundColor: 'rgba(22,24,52,1.0)',
  	borderWidth: 4,
  	borderColor: '#fff',
  	borderRadius: 4,
  	height: 60,
  	width: '100%',
    alignItems: 'flex-end',
    paddingRight: 8
  },
  removeButton: {
  	backgroundColor: 'rgba(22,24,52,1.0)',
  	borderTopWidth: 4,
  	borderColor: '#fff'
  },
  icon: {
    backgroundColor: 'transparent',
  },
  isFirst: {
  	borderTopWidth: 0,
  	height: 64
  }
})

export default class SwipeableEntry extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'open': false,
		}
	}
	renderDeleteButton(){
		return (
			<View style={[styles.removeButton, this.props.station.isFirst && styles.isFirst]}>
				<Icon name="minus" color="rgba(227,66,53,1.0)" backgroundColor="transparent" size={50} style={styles.icon}>
				</Icon>
			</View>
		);
	}
	render(){
		var that = this;
		var swipeButtons = [
			{
				component: that.renderDeleteButton(),
				onPress: function(){
					var db = new Datastore({ filename: 'myStations', autoload: true });
					db.remove({'_id': that.props.station._id}, function(error, amountRemoved){
						that.props.updateParent();
						Events.trigger('databaseChanged');
					});
				},
			}
		];
		return (
			<View>
			<Swipeout right={swipeButtons}>
				<StationTitle station={that.props.station} />
			</Swipeout>
			</View>
		);
	}
}


