import React from 'react';
import Fluxxor, {StoreWatchMixin} from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React);

var Help = React.createClass({
    mixins: [StoreWatchMixin('HelpStore')],
    componentDidMount: function(){

        this.props.flux.actions.HelpActions.getDocuments()
    },
    getStateFromFlux: function(){

        return {
            HelpStore: this.props.flux.store('HelpStore').getState()
        }
    },

    render: function(){

        var { HelpStore } = this.state;
        var { documents } = HelpStore;

        return (
            <div>
                <h1>Help</h1>

                <div className="docsflow-sp-card">
                    <div className='docsflow-card-body'>

                        <h4 className="push--bottom">User manuals</h4>

                        <ul>
                        {documents.map( (doc, key) => {

                            return (
                                <li key = { key }><a href = { doc.url } className="docsflow-a"> { doc.name }</a></li>
                            )
                        })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Help
