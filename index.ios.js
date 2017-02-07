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
import BleExample from './components/BleExample';
import Dashboard from './components/Dashboard';

const SideMenu = require('react-native-side-menu');

export default class sgreg0rReactNative extends Component {

constructor(props) {
  super(props);
  this.state = {
    menuIsOpen:false,
    screen:'0'
  };
}
  render() {

    var _navigator;
    var _route;

    const BLE = <BleExample title={'BLE'}/>;

    const DashScreen = <Dashboard/>;

    const HelloScreen = <HelloWorldApp/>;

    const Derp = <Navigator navigationBar={
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

      initialRoute={{ title: 'Derp', index: 0 }}
      renderScene={(route, navigator) => {
        _navigator = navigator;
        _route = route;
        console.log(route.title);
        switch (route.title) {
          case 'Derp':
            return <HelloWorldApp title={route.title}

              // Function to call when a new scene should be displayed
            onForward={() => {
              const nextIndex = route.index + 1;

              navigator.push({
                title: 'Derp',
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
        }
      }}
    />;

    const menu = <Menu showOans={() => {
      this.setState({menuIsOpen:false, screen:'0'});
    }}
    showZwoa={() => {
      this.setState({menuIsOpen:false, screen:'1'});
    }}
    showDrei={() => {
        this.setState({menuIsOpen:false, screen:'2'});
      }}/>;
    return (
      <SideMenu bounceBackOnOverdraw={false} isOpen={this.props.menuIsOpen} menu={menu}>
      <View style={{flex: 1}}>
      { this.state.screen === '0' ? DashScreen : null }
      { this.state.screen === '1' ? Derp : null }
      { this.state.screen === '2' ? BLE : null }
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
          <Text style={styles.name}>Deine Mutter</Text>
        </View>
        <Button
          onPress={this.props.showOans}
          title="Dääschboard"
          style={styles.item}
          color="#ffffff"
          accessibilityLabel="Learn more about this purple button"
        />

        <Button
          onPress={this.props.showZwoa}
          title="Derp?"
          style={styles.item}
            color="#ffffff"
          accessibilityLabel="Learn more about this purple button"
        />

        <Button
          onPress={this.props.showDrei}
          title="BLE Dings"
          style={styles.item}
            color="#ffffff"
          accessibilityLabel="Learn more about this purple button"
        />

      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  menu: {
    flex: 3,
    backgroundColor: '#cc88cc',
    padding: 32,
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
    fontSize: 32,
    fontWeight: '300',
    paddingTop: 64,
  },
});

const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

AppRegistry.registerComponent('sgreg0rReactNative', () => sgreg0rReactNative);
