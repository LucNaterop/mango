import React from 'react';
import {View} from 'react-native';
import {H1, Container, Content, Card, CardItem, Text} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';

import Abfahrt from './Abfahrt';
import StationsTafel from './StationsTafel';

export default class Abfahrtstafel extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'stationboard': [
				{'linie':'32','to':'Zürich, Randomplace', 'dt': 1},
				{'linie':'33','to':'Zürich, Tiefenbrunnen', 'dt': 3},
				{'linie':'33','to':'Zürich, Tiefenbrunnen', 'dt': 6},
				{'linie':'33','to':'Zürich, Tiefenbrunnen', 'dt': 11},
			]
		};	
	}


	render(){
		var stationboard = this.state.stationboard;
		stationboard = stationboard.filter(function(e){
			return e.dt >= 0;
		});
		var abfahrtList = stationboard.slice(0,4).map((abfahrt) => <Abfahrt abfahrt={abfahrt} key={Math.random()} />);
		
		var style = {
			'backgroundColor': '#331805',
			'borderColor': '#e1e5e8',
			'borderTopWidth': 25,
			'borderRightWidth': 5,
			'borderBottomWidth': 25,
			'borderLeftWidth': 5,
			'margin': 10,
			'paddingTop': 10,
			'paddingBottom': 10,
			'shadowRadius': 3,
			'shadowOpacity': 0.3,
			'shadowOffset': {'width': 1, 'height': 1}
		};

		return (
			<View>
				<StationsTafel name={this.props.name} />
				<Grid style={style}>
					{abfahrtList}
					<Row></Row>
					<Row></Row>
	            </Grid>
            </View>
		)
	}
}