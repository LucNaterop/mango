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
      <View onPress={this.onAdd.bind(this)} style={styles.container}>
  			<Icon.Button name="plus" color="rgba(227,66,53,1.0)" backgroundColor="transparent" size={50} onPress={this.onAdd.bind(this)} style={styles.icon}>
  			</Icon.Button>
      </View>
		);
	}
}

var styles = StyleSheet.create({
  container: {
  	backgroundColor: 'rgba(22,24,52,1.0)',
  	borderWidth: 3,
  	borderColor: '#fff',
  	borderRadius: 4,
  	height: 60,
    paddingLeft: 0,
    marginTop: 20,
  	width: '100%',
    alignItems: 'flex-end'
  },
  icon: {
    backgroundColor: 'transparent',
    top: -8
  },
})