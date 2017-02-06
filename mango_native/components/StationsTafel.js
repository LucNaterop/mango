import React from 'react';
import {H1, Card, CardItem, Text} from 'native-base';

export default class StationsTafel extends React.Component {

	render(){
		let style = {
			'backgroundColor': '#103F73',
			'color': 'white',
			'padding': 10,
			'marginLeft': 10,
			'marginRight': 10,
			'shadowRadius': 3,
			'shadowOpacity': 0.7,
			'shadowOffset': {'width': 0, 'height': 0}
		}
		return (
            <H1 style={style}>{this.props.name}</H1>                       
		);
	}
}
