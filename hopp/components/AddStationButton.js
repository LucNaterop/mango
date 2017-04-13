import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

/*
  props: {
    navigator: navigator
  }
*/

export default class AddStationButton extends React.Component {
	constructor(props){
		super(props);
	}
	onAdd(){
		this.props.navigator.push({name: 'addStation'});
	}
	render(){
		return (
			<Icon.Button name="plus" style={styles.container} onPress={this.onAdd.bind(this)}>
			</Icon.Button>
		);
	}
}

var styles = StyleSheet.create({
  container: {
  	backgroundColor: '#1b1464',
  	borderWidth: 3,
  	borderColor: '#fff',
  	borderRadius: 4,
  	height: 60,
  	padding: 5,
  	paddingTop: 10,
  	width: '100%',
  },
  text: {
  	textAlign: 'center',
  	color: '#fff',
  	fontSize: 20,
  	fontWeight: '500',
  },
})