import React from 'react';
import {RouteHandler} from 'react-router';
import Fluxxor, {StoreWatchMixin} from 'fluxxor';
import AuthMixin from './../mixins/AuthMixin';

var FluxMixin = Fluxxor.FluxMixin(React);

var MyProfile = React.createClass({
	mixins: [StoreWatchMixin('MyProfileStore')],
  contextTypes: {
		currentUser: React.PropTypes.object,
		router: React.PropTypes.func
	},
  getStateFromFlux: function(){

		return {
			MyProfileStore: this.props.flux.stores.MyProfileStore.getState(),
      users: {}
		}
  },

	componentDidMount: function(){
		this.props.flux.actions.MyProfileAction.getUserById();
    this.getUser();
	},
  getUser: function(){
    var userId = this.context.currentUser.id;
    this.props.flux.actions.MyProfileAction.getUserById({
      id: userId
    }, (response) => {

      var _user = response.data[0];

      this.setState({
        users: _user
  		})
    })

  },

	render: function(){
    var {
			users
		} = this.state;
		return (
      <div>
				<section className="row">
				<aside className="sp-sidebar">
					<img src={users.image} style = {{width: 40}} />
					</aside>
				<section className="docsflow-sp-content">
						<div className="docsflow-sp-card">
            <table className="profile-table">
              <tr>
                <td className="profile-tableleft">Name: </td>
                <td className="profile-tableright">{users.name}</td>
                </tr>
                <tr>
                <td>Department: </td>
                <td>{users.department}</td>
                </tr>
                <tr>
                <td>Designation: </td>
                <td>{users.designation}</td>
              </tr>
            </table>
            </div>
            </section>
            </section>
            </div>
		)
	}
});


module.exports = MyProfile
