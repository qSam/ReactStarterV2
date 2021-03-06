import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';


class NumberOfMembers extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    this.props.addPoolUsers(event.target.numOfMembers.value);
    browserHistory.push('/membercontacts');
    event.preventDefault();
  }

  render(){
      return(
        <div className="text-left">
          <form onSubmit={this.handleSubmit}>
          Please enter number of members<br />
          <select name="numOfMembers">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select><br /><br />
            <input className="btn btn-primary" type="submit" value="Next" />
         </form>
        </div>
      );
  }

}

function mapStateToProps(state) {
  return {totalMembers : state.pool.totalMembers};
}

export default NumberOfMembers = connect(mapStateToProps, actions)(NumberOfMembers);
