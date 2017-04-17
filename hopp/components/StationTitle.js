import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';

/*
	props: {
		station: {
			'_id': 'dsfl2lj23jl3j4kj5'
			'Zürich, Nürenbergstrasse'
		},
		showDistance: true
	}
*/

function distanceToKilometers(distance){
	if(distance < 1000){
		return distance + ' m';
	} else {
		distance = distance/1000;
		distance = Math.round(distance*10)/10
		return distance + ' km';
	}
}

export default class StationTitle extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		var that = this;
		if(that.props.showDistance) return (
			<View style={styles.containerWithDistance}>
				<Text style={styles.textWithDistance}>{this.props.station.name}</Text>
				<Text style={styles.distance}>{distanceToKilometers(this.props.station.distance)}</Text>
			</View>
		); else return (
			<View style={[styles.containerWithoutDistance, that.props.station.isFirst && styles.isFirst]}>
				<Text style={styles.textWithoutDistance}>{this.props.station.name}</Text>
			</View>
		)
	}
}

var styles = StyleSheet.create({
  containerWithDistance: {
  	backgroundColor: 'rgba(22,24,52,1.0)',
  	borderWidth: 4,
  	borderColor: '#fff',
  	borderRadius: 3,
  	height: 60,
  	padding: 5,
  	width: '100%'
  },
  containerWithoutDistance: {
  	backgroundColor: 'rgba(22,24,52,1.0)',
  	borderTopWidth: 4,
  	borderColor: '#fff',
  	height: 60,
  	padding: 5,
    paddingLeft: 15,
  	paddingTop: 14,
  },
  isFirst: {
    borderTopWidth: 0,
  },
  textWithDistance: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  textWithoutDistance: {
  	textAlign: 'left',
  	color: '#fff',
  	fontSize: 20,
  	fontWeight: '500',
  },
  distance: {
  	color: '#fff',
  	fontSize: 15,
  	fontWeight: '500',
  	textAlign: 'right'
  }
})
