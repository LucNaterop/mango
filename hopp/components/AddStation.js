import React from 'react';
import {View} from 'react-native';
import {Container, List, ListItem, Button, InputGroup, Input, Icon, Text, Header, Item, Content} from 'native-base';
import Datastore from 'react-native-local-mongodb';
import Events from 'react-native-simple-events';
import SearchBar from 'react-native-search-bar';

/*
	props: {
		'navigator': navigator,
	}
*/

export default class AddStation extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'searchValue': '',
			'stations': [],
		}
	}
	onSubmit(station){
		var that = this;
		var db = new Datastore({ filename: 'myStations', autoload: true });
		db.find({'name': station}, (error, docs) => {
			if(docs.length > 0){
				alert('Diese Station hast du bereits.');
				return;
			}
			db.insert({'name': station, 'createdAt': new Date()}, function(err, newDoc){
				Events.trigger('databaseChanged');
				that.props.navigator.pop()
			});
		})
	}
	onCancel(){
		this.props.navigator.pop();
	}
	onExpand(){
		this.setState({'limit': this.state.limit + 50});
		alert(this.state.limit);
	}
	onChangeSearchText(searchText){
		var that = this;
		this.setState({'searchValue': searchText});
		var request = 'http://transport.opendata.ch/v1/locations?type=station&query='+searchText;
		fetch(request).then(function(response){
			return response.json();
		}).then(function(responseData){
			var stations = responseData.stations;
			that.setState({'stations': stations.map(station => station.name)}, () => {
				console.log(that.state.stations)
			});
		}).catch(function(error){
			console.log(error);
		});

	}

	render(){
		var that = this;
		var stationsList = this.state.stations.map(station => (
			<ListItem button key={station} onPress={()=>{that.onSubmit(station)}}>
				<Text>{station}</Text>
			</ListItem>
		));

		if(stationsList.length == 0){
			var cancelButton = (
	            <Button style={{alignSelf: 'flex-end'}} transparent onPress={that.onCancel.bind(that)}>
	                <Text>Abbrechen</Text>
	            </Button>
			);
		}
		return (
			<Container style={{backgroundColor: '#fff'}}>
				<View style={{flexDirection: 'row'}}>
					<View style={{flex: 5}}>
						<SearchBar
							ref='searchBar'
							placeholder='Search'
		                	onChangeText={this.onChangeSearchText.bind(this)} 
		                	value={this.state.searchValue} 
							/>
					</View>
				</View>
				{cancelButton}
				<Content>
		            <List>
		                {stationsList}
		            </List>
	            </Content>
			</Container>
		);
	}
}

