import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import Datastore from 'react-native-local-mongodb';

import Abfahrtstafel from './Abfahrtstafel';
import AddStation from './AddStation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var that = this;
    that.state = {'stations': []};
    var db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
    db.find({}, function(e, docs){
      console.log(docs)
      that.setState({ 'stations': docs});
    });

  }

  render() {
    var tafeln = this.state.stations.map((station) => <Abfahrtstafel name={station.name} key={station._id}/>)
    return (
      <Container>
        <Header>
          <Button transparent>
            <Icon name='ios-menu' />
          </Button>
          <Title>Tafel</Title>
          <Button transparent>
            <Icon name='ios-more' />
          </Button>
        </Header>
        <Content style={{'padding': 5}}>
            {tafeln}
            <AddStation />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
