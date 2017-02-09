import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';

import Anzeigetafel from './Anzeigetafel.jsx';
import Controls from './Controls.jsx';
	

class App extends React.Component{
	render(){
		Stations = new LucDB('stations', true);
		var stations = Stations.get();
		var tafeln = stations.map((station) => <Anzeigetafel key={station._id} station={station}/>)
		return (
			<div>
				{tafeln}
				<br/><br/>
				<Controls />
			</div>
		)
	}
}


Meteor.startup(() => {
	ReactDOM.render(<App />, document.getElementById('render-target'));
});

