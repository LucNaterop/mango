import React from 'react';
import {H2, Card, CardItem, Text} from 'native-base';

export default class StationsTafel extends React.Component {

	render(){
		let style = {
			'backgroundColor': '#103F73',
			'color': 'white',
			'padding': 10,
			'marginLeft': 10,
			'marginRight': 10,
			'shadowRadius': 2,
			'shadowOpacity': 0.7,
			'shadowOffset': {'width': 0, 'height': 0}
		}
		return (
            <H2 style={style}>{this.props.name}</H2>                       
		);
	}
}
