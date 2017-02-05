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
  View,
  Button,
  Navigator,
  NavigationBar,
  TouchableHighlight
} from 'react-native';
import HelloWorldApp from './components/HelloWorldApp';

export default class sgreg0rReactNative extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator

          navigationBar={
   <Navigator.NavigationBar
     routeMapper={{
       LeftButton: (route, navigator, index, navState) =>
  {
    if (route.index === 0) {
      return null;
    } else {
      return (
        <TouchableHighlight onPress={() => navigator.pop()}>
          <Text>Back</Text>
        </TouchableHighlight>
      );
    }
  },
       RightButton: (route, navigator, index, navState) =>
         { return (null); },
       Title: (route, navigator, index, navState) =>
         { return (<Text>{route.title}</Text>); },
     }}
     style={{backgroundColor: 'white'}}
   />
}

          initialRoute={{ title: 'Best screen ever', index: 0 }}
          renderScene={(route, navigator) => {
            return <HelloWorldApp title={route.title}

              // Function to call when a new scene should be displayed
            onForward={() => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Almost screen scene ' + nextIndex,
                index: nextIndex,
              });
            }}

            // Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}

            />
          }}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('sgreg0rReactNative', () => sgreg0rReactNative);
