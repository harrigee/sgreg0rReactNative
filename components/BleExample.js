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
            oilFoxFound: false,
            pingPongString: 'Trying Ping...',
            oilFoxUUID: "74804861-FE2D-44CF-8F93-81E136058F59"
        }
    }

    componentDidMount() {
        this.setState({oilFoxFound: false});
        BleManager.start({showAlert: true});
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

        NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        NativeAppEventEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateForCharacteristics);

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
      this.toggleScanning(false);
      BleManager.stopScan()
      NativeAppEventEmitter.removeListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
      NativeAppEventEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateForCharacteristics);
      BleManager.disconnect(this.state.oilFoxUUID);
      BleManager.stopNotification(this.state.oilFoxUUID, '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', '6E400003-B5A3-F393-E0A9-E50E24DCCA9E')
    }

    handleScan() {
        BleManager.scan([], 30, true).then((results) => {
            console.log('Scanning...');
        });
    }

    toggleScanning = (bool) => {
        if (bool) {
            this.setState({scanning: true})
            this.setState({scanning:setInterval(() => this.handleScan(), 3000)});
        } else {
          console.log('Stopping scanning');
            this.setState({scanning: false, ble: null})
            clearInterval(this.scanning);
            BleManager.stopScan()
            .then(() => {
              console.log('Scan stopped');
            });
        }
    }

    handleUpdateForCharacteristics = (data) => {
        //console.log('Got characteristics data', data.value);
        this.startNotification();
    }

    handleDiscoverPeripheral = (data) => {
        //console.log('Got ble data', data);
        this.setState({ble: data})
        if (data.name === 'OilFox') {
          this.setState({oilFoxFound: true});
          BleManager.connect(data.id)
          .then((peripheralInfo) => {
             this.toggleScanning(false)
             console.log('Connected');
             console.log(peripheralInfo);
             console.log(data);
             var savedThis = this;
             this.startNotification();
             setTimeout(function () {
               savedThis.writeToDevice()
             }, 1000);
           })
           .catch((error) => {
             console.log(error);
           });
        }
    }

    startNotification = () => {
      BleManager.startNotification(this.state.oilFoxUUID, '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', '6E400003-B5A3-F393-E0A9-E50E24DCCA9E')
        .then(() => {
          // Success code
          console.log('Notification started');
          //this.readFromDevice();
        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
    }

    writeToDevice = () => {

      var base64 = require('base-64');
      var data = base64.encode('.PING');

      BleManager.write(this.state.oilFoxUUID, '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', '6E400002-B5A3-F393-E0A9-E50E24DCCA9E', data)
      .then(() => {
         // Success code
         var Buffer = require('buffer/').Buffer
         const resultData1 = new Buffer(data, 'hex');
         console.log(`Write: ${data}`);
         var savedThis = this;
         savedThis.setState({pingPongString:`Write: Ping`});
         setTimeout(function () {
           savedThis.readFromDevice()
         }, 1000);
       })
       .catch((error) => {
         // Failure code
         console.log(error);
       });
    }

    readFromDevice = () => {
      BleManager.read(this.state.oilFoxUUID, '6E400001-B5A3-F393-E0A9-E50E24DCCA9E', '6E400003-B5A3-F393-E0A9-E50E24DCCA9E')
        .then((readData) => {
          // Success code
          var Buffer = require('buffer/').Buffer
          const resultData2 = new Buffer(readData, 'hex');
          console.log(`Read: ${resultData2}`);
          var savedThis = this;
          savedThis.setState({pingPongString:`Read: ${resultData2}`});
          setTimeout(function () {
            savedThis.writeToDevice()
          }, 1000);
        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
    }

    isThisOilFox = (deviceName) => {
      if (this.state.oilFoxFound) {
        return <Text>OilFox - { this.state.pingPongString }</Text>
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
