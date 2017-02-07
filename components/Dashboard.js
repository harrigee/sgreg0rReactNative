import React, {Component} from 'react';
import {
    Text,
    Button,
    View,
    TextInput,
    ScrollView,
    ListView,
    Image,
    Dimensions
} from 'react-native';

class Dashboard extends Component {

  vw = (percentageWidth) => {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh = (percentageHeight) => {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        return (
            <View style={{
                paddingTop: 64,
                flex: 1,
                backgroundColor: 'cadetblue'
            }}>
                <View style={{
                    flex:1,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    paddingBottom: 64
                }}>
                    <Image source={require('../assets/bg.png')} style={{
                        alignSelf: 'center',
                        width: this.vw(70),
                        height: this.vw(70)
                      }}/>
                </View>
            </View>
        );
    }
}

export default Dashboard;
