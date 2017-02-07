import React, {Component} from 'react';
import {
    Text,
    Button,
    View,
    TextInput,
    ScrollView,
    ListView,
    Image,
    Dimensions,
    StatusBar
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
            text: '',
            fillingImages: [require('../assets/0.png'), require('../assets/1.png'), require('../assets/2.png'), require('../assets/3.png'), require('../assets/4.png'), require('../assets/5.png')],
            indexFillingImage: 0
        };
    }

    componentDidMount() {
      setInterval(() => this.handleInterval(), 100);
    }

    handleInterval = () => {
      if (this.state.indexFillingImage <= 4) {
        this.setState({indexFillingImage: this.state.indexFillingImage + 1 });
      }
      else {
        this.setState({indexFillingImage: 0 });
      }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 64,
                backgroundColor: 'cadetblue'
            }}>
                <StatusBar barStyle="light-content"/>
                <View>
                    <Image source={require('../assets/bg.png')} style={{
                        width: this.vw(80),
                        resizeMode: 'contain',
                        alignSelf:'center',

                    }}/>
                    <Image source={this.state.fillingImages[this.state.indexFillingImage]} style={{
                        width: this.vw(80),
                        resizeMode: 'contain',
                        position: 'absolute',
                        alignSelf:'center',
                        left: this.vw(10)
                    }}/>
                </View>
            </View>
        );
    }
}

export default Dashboard;
