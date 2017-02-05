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
  TouchableHighlight,
  Image,
  ScrollView
} from 'react-native';
import HelloWorldApp from './components/HelloWorldApp';

const SideMenu = require('react-native-side-menu');

class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
}

export default class sgreg0rReactNative extends Component {
  render() {
    const menu = <Menu/>;
    return (
      <SideMenu menu={menu}>
      <View style={{flex: 1}}>
        <Navigator navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (route.index === 0) {
                  return null;
                } else {
                return (
                  <TouchableHighlight onPress={() => navigator.pop()}>
                    <Image source={require('./assets/back.png')} style={{alignSelf:'center', width:32, height:32}} />
                  </TouchableHighlight>
                );
              }
            },
             RightButton: (route, navigator, index, navState) =>
               { return (null); },
             Title: (route, navigator, index, navState) =>
               { return (<Text style={{color:'white'}}>{route.title}</Text>);
             },
           }}
           style={{backgroundColor: 'black'}}
         />
      }

          initialRoute={{ title: 'Best screen ever', index: 0 }}
          renderScene={(route, navigator) => {
            return <HelloWorldApp title={route.title}

              // Function to call when a new scene should be displayed
            onForward={() => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Almost best screen ever ' + nextIndex,
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
    </SideMenu>
    );
  }
}

class Menu extends Component {

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
          <Text style={styles.name}>Your name</Text>
        </View>

        <Text
          style={styles.item}>
          About
        </Text>

        <Text
          style={styles.item}>
          Contacts
        </Text>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  menu: {
    flex: 3,
    backgroundColor: '#cc88cc',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

AppRegistry.registerComponent('sgreg0rReactNative', () => sgreg0rReactNative);
