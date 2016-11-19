import React from 'react';
import Select2 from '../Select2';
import {validationOptions} from './../../constants';
import {checkSelect2Valid} from './../../utilities';

var NewMapping = React.createClass({
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getInitialState: function(){

		var {selectedMapping, selectedMappingType} = this.props;
		var isEditing = !!Object.keys(selectedMapping).length;

		return {
			mappingType: selectedMappingType || '',
			memberOfParliament: selectedMapping.memberOfParliament || '',
			hod: selectedMapping.hod || '',
			hodsMp: selectedMapping.hods || [],
			liasonOfficers: selectedMapping.liasonOfficers || [],
			isEditing: isEditing
		}
	},
	componentDidMount: function(){

		this.$form = $(this.refs.form.getDOMNode());

		this.$form.validate(validationOptions);

	},
	onSave: function(event){

		var {
			mappingType,
			memberOfParliament,
			hodsMp,
			hod,
			liasonOfficers,
			isEditing
		} = this.state;

		var {
			selectedMapping
		} = this.props;

		if(this.$form.valid()){

			event && event.preventDefault();

			/**
			 * For create
			 */

			switch(parseInt(mappingType)){

				case 1:

					if(isEditing){

						var _hodsMp = hodsMp.map( (item) => item.id? item.id.toString() : item.toString());

						this.props.flux.actions.AdminActions.updateMappingMpToHods({
							userId: this.context.currentUser.id,
							memberOfParliament: memberOfParliament.id,
							hods: _hodsMp,
							index: this.props.index
						}, () => {

							this.props.closeModal && this.props.closeModal.call(this)
						})

					}else{

						this.props.flux.actions.AdminActions.createMappingMpToHods({
							userId: this.context.currentUser.id,
							memberOfParliament: memberOfParliament.id,
							hods: hodsMp
						}, () => {

							this.props.closeModal && this.props.closeModal.call(this)
						})
					}

					break;

				case 2:

					if(isEditing){

						var _liasonOfficers = liasonOfficers.map( (item) => item.id? item.id.toString() : item.toString());

						this.props.flux.actions.AdminActions.updateMappingHodToLiasons({
							userId: this.context.currentUser.id,
							hod: hod.id,
							liasonOfficers: _liasonOfficers,
							index: this.props.index
						}, () => {

							this.props.closeModal && this.props.closeModal.call(this)
						})

					}else{

						this.props.flux.actions.AdminActions.createMappingHodToLiasons({
							userId: this.context.currentUser.id,
							hod: hod.id,
							liasonOfficers: liasonOfficers
						}, () => {

							this.props.closeModal && this.props.closeModal.call(this)
						})
					}

					break;
			}

		}
	},
	renderMpHods: function(){

		var {selectedMapping} = this.props;

		var {isEditing}	 = this.state;

		return (
			<div className="render-hod">
				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_MPS}
					placeholder= 'Member of Parliament'
					disabled = {isEditing}
					multiple = {false}
					required = {true}
					key = {1}
					name="memberOfParliament"
					defaultValue = {selectedMapping.memberOfParliament}
					onChange = { (val, data, event) => {

						checkSelect2Valid(event);

						this.setState({
							memberOfParliament: data
						})
					}}
				/>

				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_HODS}
					placeholder= 'HODs'
					multiple = {true}
					ref = 'hodsMp'
					key = {2}
					name="hodsMp"
					required = {true}
					defaultValue = {selectedMapping.hods}
					onChange = { (val, data, event) => {

						checkSelect2Valid(event);

						this.setState({
							hodsMp: val
						})

					}}
				/>

			</div>
		)
	},
	renderHodLiason: function(){

		var {selectedMapping} = this.props;

		var {isEditing} = this.state;

		return (
			<div className="render-liason">
				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_HODS}
					placeholder= 'HODs'
					multiple = {false}
					ref = 'hod'
					name="hod"
					key = {3}
					required = {true}
					defaultValue = {selectedMapping.hod}
					disabled = {isEditing}
					onChange = { (val, data, event) => {

						checkSelect2Valid(event);

						this.setState({
							hod: data
						})

					}}
				/>

				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_LIASON_OFFICERS}
					placeholder= 'Liaison officers'
					multiple = {true}
					ref = 'liasonOfficers'
					name="liasonOfficers"
					required = {true}
					key = {4}
					defaultValue = {selectedMapping.liasonOfficers}
					onChange = { (val, data, event) => {

						checkSelect2Valid(event);

						this.setState({
							liasonOfficers: val
						})


					}}
				/>
			</div>
		)
	},
	render: function(){

		var {
			selectedMapping
		} = this.props;

		var {
			mappingType,
			id,
			isEditing
		} = this.state;

		var formContent = null;

		switch(parseInt(mappingType)){
			case 1:
				formContent = this.renderMpHods();
				break;

			case 2:
				formContent = this.renderHodLiason();
				break;
		}

		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					{isEditing? 'Edit mapping': 'Add mapping'}
				</div>
				<form className="modal-dialog-body" ref="form">
					<Select2
						placeholder="Select mapping type"
						className="select2-flushtop"
						disabled = {isEditing}
						required = {true}
						value = {mappingType}
						onChange = { (val, data, event)=> {

							this.setState({
								mappingType: val
							})

							checkSelect2Valid(event);

						}}
					>
						<option></option>
						<option value="1">MP to HODs</option>
						<option value ="2">HOD to Liaison officers</option>
					</Select2>

					{formContent}

					<div className="docflow-form-control docsflow-submit-control">
						<button className="docsflow-btn docsflow-btn-primary" onClick = {this.onSave}>Submit</button>
						<a onClick = {this.props.closeModal} className="docsflow-btn docsflow-btn--unstyled">Cancel</a>
					</div>
				</form>
			</div>
		)
	}
});

module.exports = NewMapping
