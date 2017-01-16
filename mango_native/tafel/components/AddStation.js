import React from 'react';
import {Alert} from 'react-native';
import {List, ListItem, Button, InputGroup, Input, Icon} from 'native-base';
import Datastore from 'react-native-local-mongodb';

export default class AddStation extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'stationName': '',
		}
	}
	onSubmit(event){
		var that = this;
		if(that.state.stationName <= 3){
			Alert.alert('Stationsname zu kurz');
			return;
		} 
		var db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
		db.insert({'name': this.state.stationName}, function(err, newDoc){
			that.setState({'stationName':''});
			Alert.alert('Jeiii');
		});
	}
	render(){
		return (
            <List>
                <ListItem>
                    <InputGroup>
                        <Input inlineLabel label="Station:" placeholder="z.b. Schaffhauserplatz" 
                        	value={this.state.stationName} 
                        	onChangeText={(text) => this.setState({'stationName': text})} 
                        	/>
                    </InputGroup>
                </ListItem>
                    <Button onPress={this.onSubmit.bind(this)} large bordered style={{alignSelf:'center', 'marginTop': 20, 'width':60}}>
                       <Icon name='ios-add' />
                    </Button>
            </List>
                    
		)
	}
}

