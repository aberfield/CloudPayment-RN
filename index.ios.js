/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Navigation from "./src/Navigation";


class CloudPaymentProject extends Component {
  render() {
    return (
      <Navigation> </Navigation>
    );
  }
}

AppRegistry.registerComponent('CloudPaymentProject', () => CloudPaymentProject);


