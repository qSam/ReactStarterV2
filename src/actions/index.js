import axios from 'axios';
import {browserHistory} from 'react-router';
import {
  AUTH_ERROR,
  ADD_POOL_USERS,
  ADD_POOL_CONTACTS,
  ADD_POOL_DETAILS,
  FETCH_USER_POOLS,
  SIGNIN_USER,
  SIGNOUT_USER
} from './types';


const ROOT_URL = 'http://localhost:3080';

export function signupUser({username, password}){

  return function(dispatch) {

    axios.post(`${ROOT_URL}/signup`,{username,password})
      .then( response => {
        //Dispatch Auth action to reducer
        dispatch({
          type: SIGNIN_USER,
          payload: {username}.username
        });

        //Redirect to home
        browserHistory.push('/home');

      })
      .catch( response => {
        console.log("Error :", response);
        dispatch({
          type:AUTH_ERROR,
          payload: 'Unable to create user account. User name may already be in use.'
        })
      })
  };

}

export function signinUser({username,password}){

  return function(dispatch) {

    axios.post(`${ROOT_URL}/signin`, {username,password})
      .then ( response => {
        //Dispatch Auth action to reducers
        dispatch({
          type: SIGNIN_USER,
          payload: {username}.username
        });

        //Redirect to home
        browserHistory.push('/home');

      })
      .catch( response => {
        console.log("Error :", response);
        dispatch({
          type:AUTH_ERROR,
          payload: 'Unable to login'
        })
      })
  }
}

export function signoutUser() {
  return { type: SIGNOUT_USER };
}

export function submitNewPool(values) {
  return function(dispatch){
    const ID = values.username;

    axios.post(`${ROOT_URL}/createPolicy/${ID}`,{
        "policyName": values.policyName,
        "totalAmount":  values.totalAmount,
        "policyLength": values.policyLength
    })
    .then (response => {
      console.log("Policy successfully created");
      browserHistory.push('/home');
    })
    .catch (response => {
      console.log("Error: ",response);
    })
  }
}

export function addPoolUsers(numOfUsers){

  return function(dispatch) {
    dispatch({
      type:ADD_POOL_USERS,
      payload: numOfUsers
    })
  }
}

export function addPoolContacts(contacts){

  return function(dispatch) {
    dispatch({
      type:ADD_POOL_CONTACTS,
      payload: contacts
    })
  }
}

export function addPoolDetails(values){

  return function(dispatch) {
    dispatch({
        type: ADD_POOL_DETAILS,
        payload:values
    })
  }
}

export function getAllUserPools(ID) {
  return function(dispatch){
    axios.get(`${ROOT_URL}/getAllPolicies/${ID}`,{})
      .then(response => {
        dispatch({
          type: FETCH_USER_POOLS,
          payload: response.data
        });
      })
      .catch(response => {
        console.log("Error: ", response);
      })
  }
}
