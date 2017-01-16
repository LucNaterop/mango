import React from 'react';

export default class HaltestellenName extends React.Component {
	render(){
		var style = {
			'backgroundColor': '#0e23a5',
			'color': '#eee',
			'width': '300px',
			'padding': '20px 0px 10px 5px',
			'marginTop': '50px',
			'fontSize': '20px'
		};
		return (
			<div style={style} className='z-depth-2'>
				<p style={{'margin': '0'}}>{this.props.name}</p>
			</div>
		);
	}
}


