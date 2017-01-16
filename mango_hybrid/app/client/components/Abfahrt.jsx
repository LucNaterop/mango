import React from 'react';

export default class Abfahrt extends React.Component {
	render(){
		var dt = this.props.abfahrt.dt;
		if(dt == 0){
			// get the symbol here that shows up at 0 mins
			dt = '0';
		}
		return (
			<tr>
				<td style={{'padding':'2px 0px 2px 15px','textAlign':'right', 'width': '20px'}}>{this.props.abfahrt.number}</td>
				<td style={{'padding':'2px 0px 2px 5px'}}>{this.props.abfahrt.to}</td>
				<td style={{'padding':'2px 10px 2px 0px', 'textAlign':'right'}}>{dt}′</td>
			</tr>
		)
	}
}
