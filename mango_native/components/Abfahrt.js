import React from 'react';
import {Text} from 'native-base';
import {Row, Col} from 'react-native-easy-grid';

export default class Abfahrt extends React.Component {
	render() {
		var dt = this.props.abfahrt.dt;
		if(dt == 0){
			// get the symbol here that shows up at 0 mins
			dt = '0';
		}
		var style= {'color': '#ffa556', 'fontSize': 16};
		var style1 = style;
		return (
			<Row>
				<Col style={{'width': 30}} >
					<Text style={style}> {this.props.abfahrt.linie}</Text>
				</Col>
				<Col>
					<Text style={style}>{this.props.abfahrt.to}</Text>
				</Col>				
				<Col style={{'width': 30}}>
					<Text style={style}>{this.props.abfahrt.dt + '′'}</Text>
				</Col>				
			</Row>
		)
	}
}