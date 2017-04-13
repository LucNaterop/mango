 import React from 'react';
import {View,Text,StyleSheet} from 'react-native';


export default class Abfahrt extends React.Component {
	render() {
		var dt = this.props.abfahrt.dt;
		if(dt == 0){
			// get the symbol here that shows up at 0 mins
			dt = '0';
		}
		return (
			<View style={{flexDirection: 'row'}} >
				<View style={{flex: 2}} >
					<Text style={style.vehicleType}>{this.props.abfahrt.type}</Text>
				</View>
				<View style={{flex: 3}} >
					<Text style={style.linieText}> {this.props.abfahrt.linie}</Text>
				</View>
				<View style={{flex: 15}} >
					<Text style={style.text}>{this.props.abfahrt.to}</Text>
				</View>				
				<View style={{flex:3}} >
					<Text style={style.dtText}> {this.props.abfahrt.dt + '′'}</Text>
				</View>				
			</View>
		)
	}
}


var style = StyleSheet.create({
	text: {
		fontSize: 16, 
		color: '#fff',
		fontWeight: '500',
	},
	linieText: {
		fontSize: 16, 
		color: '#fff',
		fontWeight: '500',
		textAlign: 'right',
		marginRight: 8
	},
	dtText: {
		fontSize: 16, 
		color: '#fff',
		fontWeight: '500',
		textAlign: 'right',
		marginRight: 8
	},
	vehicleType: {
		borderWidth: 1,
		fontSize: 14,
		borderColor: '#fff',
		color: '#fff',
		borderRadius: 2,
		width: 18,
		paddingLeft: 4,
		marginLeft: 4,
		fontWeight: '500',
	}
})