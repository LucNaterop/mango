import React from 'react';

import {Container, Content, Card, CardItem, Text} from 'native-base';

export default class AnzeigeTafel extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		};
	}
	render(){
		return (
            <Card>
	            <CardItem header>
	                <Text>{this.props.name}</Text>
	            </CardItem>
                <CardItem>
                    <Text>
                    	loremasdfjldasjfalfds lks dfasda djkladka dskljklj adalkfdsa
                    </Text>
                </CardItem>
            </Card>
		)
	}
}