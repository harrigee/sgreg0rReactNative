import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    TouchableHighlight,
    NativeAppEventEmitter,
    Platform,
    PermissionsAndroid
} from 'react-native';
import BleManager from 'react-native-ble-manager';

class BleExample extends Component {

    constructor() {
        super()
        this.state = {
            ble: null,
            scanning: false,
            oilFoxFound: false
        }
    }

    componentDidMount() {
        this.setState({oilFoxFound: false});
        BleManager.start({showAlert: true});
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

        NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }
    }

    componentWillUnmount() {
      NativeAppEventEmitter.removeListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
      () => this.toggleScanning(false);
    }

    handleScan() {
        BleManager.scan([], 30, true).then((results) => {
            console.log('Scanning...');
        });
    }

    toggleScanning(bool) {
        if (bool) {
            this.setState({scanning: true})
            this.scanning = setInterval(() => this.handleScan(), 3000);
        } else {
            this.setState({scanning: false, ble: null})
            clearInterval(this.scanning);
            BleManager.stopScan()
            .then(() => {
              console.log('Scan stopped');
            });
        }
    }

    handleDiscoverPeripheral(data) {
        console.log('Got ble data', data);
        this.setState({ble: data})
        if (data.name === 'OilFox') {
          this.setState({oilFoxFound: true});
        }
    }

    isThisOilFox = (deviceName) => {
      if (this.state.oilFoxFound) {
        return <Text>OilFox</Text>
      }
      return <Text>No OilFox</Text>
    }

    render() {

        const container = {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF'
        }

        const bleList = this.state.ble
            ? <Text>
                   {this.isThisOilFox(this.state.ble.name)}
                </Text>
            : <Text>no devices nearby</Text>

        return (
            <View style={container}>
                <TouchableHighlight style={{
                    padding: 20,
                    backgroundColor: '#ccc'
                }} onPress={() => this.toggleScanning(!this.state.scanning)}>
                    <Text>Scan Bluetooth ({this.state.scanning
                            ? 'on'
                            : 'off'})</Text>
                </TouchableHighlight>
                {bleList}
            </View>
        );
    }
}

export default BleExample;
