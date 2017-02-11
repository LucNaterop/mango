import React from 'react';
import { View, Text, StyleSheet, Navigator } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import Datastore from 'react-native-local-mongodb';

import Abfahrtstafel from './Abfahrtstafel';
import AddStation from './AddStation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var that = this;
    that.state = {'stations': [], 'editing': false};
    var db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
    db.find({}, function(e, docs){
      that.setState({ 'stations': docs});
    });
  }

  clicked(){
    alert('clicked');
  }

  update(){
    var that = this;
    var db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
    db.find({}, function(e, docs){
      that.setState({ 'stations': docs});
    });
  }

  render() {
    var that = this;
    const routes = [
      {name: 'Abfahrten'},
      {name: 'Station hinzufügen'}
    ];
    var tafeln = this.state.stations.map((station) => <Abfahrtstafel 
      name={station.name} 
      id={station._id} 
      key={station._id} 
      editing={that.state.editing}
      updateAppState={that.update.bind(that)} />
    );
    return (
        <Navigator 
          initialRoute={{ name: 'Abfahrten', index: 0 }}
          renderScene={function(route, navigator){
            if(route.name == 'Abfahrten'){ 
              if(tafeln.length == 0){
                var newText = <Text style={{'textAlign':'center', 'margin': 20, 'marginTop': 50, 'fontSize': 20}}>
                  Füge deine Stationen hinzu, indem du oben auf das kleine Plus drückst!
                  </Text>
              } 
              return (
                <Container>
                  <Header>
                    <Button transparent>
                      <Icon name='ios-menu' />
                    </Button>
                    <Title>{route.name}</Title>
                    <Button transparent onPress={()=>{that.setState({'editing': !that.state.editing})}}>
                      <Icon name='md-create' style={{'color': that.state.editing ? 'blue' : '#ccc'}}/>
                    </Button>
                    <Button transparent onPress={function(){navigator.push(routes[1])}}>
                      <Icon name='md-add' />
                    </Button>
                  </Header>
                  <Content style={{'padding': 5}}>
                    {newText}
                    {tafeln}
                    
                  </Content>
                </Container>
              );
            }
            if(route.name == 'Station hinzufügen'){
              return (
                <Container style={{'backgroundColor': 'white'}}>
                  <Header>
                    <Button transparent onPress={()=> {navigator.pop()}}>
                      <Icon name='ios-arrow-back' />
                    </Button>
                    <Title>{route.name}</Title>
                  </Header>
                  <Content>
                    <AddStation 
                      updateParentState={that.update.bind(that)}
                      goBack={() => {navigator.pop()}}
                      />
                  </Content>
                </Container>
              );
            }
          }
        }/>
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

/*
          <Container>
            <Header>
              <Button transparent>
                <Icon name='ios-menu' />
              </Button>
              <Title>{route.title}</Title>
              <Button transparent>
                <Icon name='md-add' />
              </Button>
            </Header>
            <Content style={{'padding': 5}}>
                {tafeln}
                <AddStation />
            </Content>
          </Container>
*/