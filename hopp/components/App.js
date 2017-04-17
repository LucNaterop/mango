import React from 'react';
import {Navigator, TouchableHighlight, Text, View, StatusBar, StyleSheet} from 'react-native';
import Slides from './Slides.js';
import EditStations from './EditStations.js';
import AddStation from './AddStation.js';

export default class App extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		var that = this;
		const routes = [
			{name: 'slides'},
			{name: 'editStations'},
			{name: 'addStation'}
		];
		const NoBackGestures ={
			...Navigator.SceneConfigs.FloatFromBottom,
			gestures: {
				pop: {},
			},
		};

		return (
			<View style={{flex: 1,'backgroundColor': 'rgba(0, 0, 0, 0.8)'}} >
				<View style={{flex: 1,'backgroundColor': 'rgba(30, 30, 30, 0.6)'}} />
				<View style={styles.mainContainer}>
					<StatusBar barStyle="light-content"/>
					<Navigator 
						initialRoute={routes[0]}
						initialRouteStack={routes}
						renderScene={(route, navigator) => {
							if(route.name == 'slides') return <Slides navigator={navigator} /> ;
							if(route.name == 'editStations') return <EditStations navigator={navigator} />;
							if(route.name == 'addStation') return <AddStation navigator={navigator}/>;
						}}
						configureScene={(route, routeStack) => {
							return NoBackGestures;
						}}
					/>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	mainContainer: {
		flex: 15,
		backgroundColor: 'rgba(163, 207, 246, 1.0)',
	}
})