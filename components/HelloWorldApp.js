import React, { Component } from 'react';
import { AppRegistry, Text, Button, View, TextInput, ScrollView, ListView, Image } from 'react-native';

class HelloWorldApp extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {text: '',
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
        'John', 'Joel',
      ])
    };
  }

  onPress = () => {
    this.props.onForward();
  }

  render() {
    return (
      <View style={{paddingTop: 64, backgroundColor: 'white'}}>
        <ScrollView>
          <Button
            onPress={this.onPress}
            title="Next screen"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <View style={{padding: 10}}>
            <TextInput
              style={{height: 40}}
              placeholder="Type here to translate!"
              onChangeText={(text) => this.setState({text})}
            />
            <Text style={{padding: 10, fontSize: 42}}>
              {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
            </Text>
          </View>
          <View style={{flex: 1, paddingTop: 22}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <View><Text>{rowData}</Text><Image source={require('../assets/troll-face-meme.png')} style={{alignSelf:'center'}} /></View> }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default HelloWorldApp;
