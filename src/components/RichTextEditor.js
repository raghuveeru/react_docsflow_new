import React from "react";
import '../vendor/bootstrap.min.css';
import '../vendor/bootstrap.min.js';
var RichTextEditor = React.createClass({
  getInitialState: function(){

    return {
      isFocused: false,
      hasValue: false,
    }
  },
  handleOnFocus: function(){

    this.setState({
      isFocused: true,
    });

  },
  handleOnBlur: function(event){

    this.setState({
      isFocused: false,
      hasValue: event.target.value == ''? false: true,
    })
  },
  componentDidUpdate: function(nextProps){

    if(nextProps.defaultValue != this.props.defaultValue || nextProps.value != this.props.value){
      this.setState({
        hasValue: true
      });

    }
  },
    componentDidMount: function() {
      $('.summernote').summernote({
        height: 400,
        //width: 800,
        tabsize: 2,
        codemirror: {
          mode: 'text/html',
          htmlMode: true,
          lineNumbers: true,
          theme: 'monokai'
        }
      });
    },

    render: function() {
        return (
            <textarea className="summernote"
            required = {this.props.required}
            onFocus = {this.handleOnFocus}
  					onBlur = {this.handleOnBlur}
            defaultValue = {this.props.defaultValue}
  					value = {this.props.value}
            ref = 'richtextarea'
            name = {this.props.name}
            width = {this.props.width}
            toolbar = {this.props.toolbar}
            ></textarea>

        );
    }
});

module.exports = RichTextEditor;
