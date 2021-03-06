import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class Signin extends Component {

  handleFormSubmit(values) {
    //Call Signin Action Creator
    this.props.signinUser(values);

  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
          <div className="alert alert-danger">
            {this.props.errorMessage}
          </div>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

      <fieldset className="form-group">
        <label htmlFor="username">User Name</label>
        <Field name="username" className="form-control" component="input" type="text" />
      </fieldset>

      <fieldset className="form-group">
        <label>Password</label>
        <Field name="password" className="form-control" component="input" type="password" />
      </fieldset>
      {this.renderAlert()}
      <button action="submit" className="btn btn-primary">Sign In!</button>
    </form>
  );
  }
}

function validate(formProps){
  const errors = {};

  return errors;
}

function mapStateToProps(state){
  return {errorMessage:state.auth.error};
}

Signin = reduxForm({
  form:'signin',
  validate:validate
})(Signin);

export default Signin = connect(mapStateToProps, actions)(Signin);
