import React from 'react';
import {Navigator, TouchableHighlight, Text, View, StatusBar} from 'react-native';
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
		return (
			<View style={{flex: 1, paddingTop: 30, paddingLeft: 10, paddingRight: 10, 'backgroundColor': 'rgba(0, 0, 0, 0.8)'}} >
				<View style={{'backgroundColor': '#fff', flex: 1}}>

					<StatusBar barStyle="light-content"/>
					<Navigator 
						initialRoute={routes[0]}
						initialRouteStack={routes}
						renderScene={(route, navigator) => {
							if(route.name == 'slides') return (
								<Slides navigator={navigator} />
							);
							if(route.name == 'editStations') return (
								<EditStations navigator={navigator} />
							);
							if(route.name == 'addStation') return (
								<AddStation navigator={navigator}/>
							);
						}}
						configureScene={(route, routeStack) => {
							return Navigator.SceneConfigs.FloatFromBottom
						}}
					/>
				</View>
			</View>
		);
	}
}