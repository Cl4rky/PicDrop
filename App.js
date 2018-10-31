import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
//import Camera from 'react-native-camera';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const styles = StyleSheet.create({

  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height:'90%',
    ...StyleSheet.absoluteFillObject,
  },
  camera:{
    height: '10%',
    width:'100%',
    backgroundColor: 'green',
  },
});

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ready: true,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      dave: true,
      markers: [
        {
        title: 'hello',
        coordinates: {
          latitude: 51.354837, 
          longitude: -0.780931
        },
      },
      {
        title: 'hello2',
        coordinates: {
          latitude: 51.355329,
          longitude: -0.777387
        },  
      }],
    }
  }

  takePicture() { 
     this.camera.capture()
    
      .then((data) => console.log(data))
      .catch(err => console.error(err));   
  }

  setRegion(region){
    if(this.state.ready) {
      setTimeout(() => this.map.animateToRegion(region), 10);
      console.log("err okay");
    }
  }
  
  componentDidMount(){
    // this.setState({
    //   markers : [{
    //     coordinates: {
    //           latitude: 51.354837, 
    //           longitude: -0.780931
    //         },
    //       }],
    // })
    this.getCurrentPosition();
  }

  onRegionChange(region){
    console.log("Region Changed");
    console.log(region.latitudeDelta);
    console.log(region.longitudeDelta);

    if(region.longitudeDelta > 0.03 && region.latitudeDelta > 0.03 ){
      console.log("should have done it");
      //this.state.markers = [];
      console.log("Updated");
      if(this.state.dave){
        console.log("whaa");
      }
  }
}

  getCurrentPosition(){
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.setRegion(region);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
  }

  render() {
    const { region } = this.props;
    coords = {
      latitude: 37.3,
      longitude: -122.4
    }

    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation
          ref={ map => { this.map = map }}
          onRegionChange={this.onRegionChange}
          initalRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.030,
          longitudeDelta: 0.0121,
          }}
        >

        {this.state.markers.map(marker => (
            <Marker
            coordinate={marker.coordinates}
            title={marker.title}
            description={"Twat Description"}
            />
        ))}

        </MapView>
        <View style={styles.camera}>
        </View>
      </View>
    );
  }
}