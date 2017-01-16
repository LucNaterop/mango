import React from 'react';

import HaltestellenName from './HaltestellenName.jsx';
import Abfahrt from './Abfahrt.jsx';


export default class Anzeigetafel extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			'stationboard': []
		};
	}
	
	update(){
		var that = this;
		var request = "http://transport.opendata.ch/v1/stationboard?station="+this.props.station.name+"&limit=10";
		$.getJSON(request, function(response){
			var stationboard = [];
			response.stationboard.forEach(function(abfahrt){
				var dt = abfahrt.stop.departureTimestamp- new Date().getTime()/1000;
				dt = dt/60;
				dt = Math.round(dt);
				stationboard.push({'number':abfahrt.number, 'to': abfahrt.to, 'dt': dt});
			});
			that.setState({'stationboard': stationboard});
		});
	}
	
	componentDidMount() {
		this.update()
	}

	render(){
		var stationboard = this.state.stationboard;
		stationboard = stationboard.filter(function(e){
			return e.dt >= 0;
		});

		var list = stationboard.slice(0,4).map((abfahrt) => <Abfahrt abfahrt={abfahrt} key={Random.id()} />)
		var style = {
			'backgroundColor': '#331805',
			'color': '#ffa556', 
			'width': '300px', 
			'borderTop': '25px solid #e1e5e8',
			'borderRight': '5px solid #e1e5e8',
			'borderBottom': '25px solid #e1e5e8',
			'borderLeft': '5px solid #e1e5e8',
			'fontSmooth': 'never',
			'padding': '10px',
		};

		return (
			<div>
				<HaltestellenName name={this.props.station.name}/>
				<table style={style} className="z-depth-3">
					{list}
				</table>
			</div>
		)
	}
}
