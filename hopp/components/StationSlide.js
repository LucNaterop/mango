import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import StationTitle from './StationTitle.js';
import StationBoard from './StationBoard.js';

/*
	props: {
		station: {
			'_id': 'dsfl2lj23jl3j4kj5'
			'Zürich, Nürenbergstrasse'
		}
	}
*/

export default class StationSlide extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<View style={styles.slide}>
				<StationTitle station={this.props.station} showDistance={true}/>
				<StationBoard station={this.props.station}/>
			</View>

		)
	}
}

var styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },
});
