/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HelloWorldApp from './jsx/HelloWorldApp';

export default class sgreg0rReactNative extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HelloWorldApp/>
        <HelloWorldApp/>
        <HelloWorldApp/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('sgreg0rReactNative', () => sgreg0rReactNative);
