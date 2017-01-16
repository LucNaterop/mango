import React from 'react';

export default class Controls extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: ''};

	}

	refreshPage(){
		document.location.href = document.location.href;
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		Stations.insert({'name': this.state.value});
		this.refreshPage();
	}
	
	handleWipe(event){
		Stations.set([]);
		this.refreshPage();
	}

	render() {
		return (
			<div className="row">
				<div className="input-field col s6">
					<input value={this.state.value} onChange={this.handleChange.bind(this)} id="first_name2" type="text" className="validate" />
					<label className="active">Haltestelle</label>
				</div>
				<br/>
				<a className="btn-floating btn-large waves-effect waves-light grey" onClick={this.handleSubmit.bind(this)}><i className="material-icons">add</i></a>
				<br/>
				<a className="waves-effect waves-light btn grey" onClick={this.handleWipe.bind(this)}>Delete all</a>
			</div>
		);
	}
}