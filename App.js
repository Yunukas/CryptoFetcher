import React, { Component } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View, TouchableHighlight, ListView, RefreshControl } from 'react-native';
import api from './utilities';

let winSize = Dimensions.get('window');

class Elements extends Component {
  handlePress(){
    //console.log('press');
  }
  handleLongPress(){
    //console.log('longPress');
  }
  
  render(){
    return(   
      this.props.value.map((element, index) => (
        <TouchableHighlight
          style={styles.TouchablePinBodyChild}
          key={index} 
          onPress={this.handlePress}
          onLongPress={this.handleLongPress}>
          <View style={styles.PinBodyChild}>
            <View style={styles.PinBodyChildText}>
              <Text style={styles.text}>{index+1}){element.symbol}</Text>
            </View>
            <View style={styles.PinBodyChildText}><Text style={styles.text}>{element.price_usd}</Text></View>
            <View style={styles.PinBodyChildText}><Text style={styles.text}>{element.percent_change_24h}</Text></View>
          </View>
        </TouchableHighlight>
      ))
    );
  }
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      cryptoData: [],
      refreshing: false
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    api.GetCryptoData().then((response) => {
      this.setState({
        cryptoData: response,
        refreshing: false
      })
    });
  }
  

  componentDidMount() {
    api.GetCryptoData().then((response) => {
      this.setState({
        isLoading: false,
        cryptoData: response
      })
    });
  }

  render() {
    if (this.state.isLoading) {
      return (<View style={styles.LoadingContainer}><Text>Loading...</Text></View>)
    }else{
      return(
        <View style={styles.PinContainer}>
          <View style={styles.PinHeader}>
            <View style={styles.PinBodyChildText}><Text style={styles.PinHeaderText}>Type</Text></View>
            <View style={styles.PinBodyChildText}><Text style={styles.PinHeaderText}>Price</Text></View>
            <View style={styles.PinBodyChildText}><Text style={styles.PinHeaderText}>% Change</Text></View>
          </View>
          <View style={styles.PinBody}>
            <ScrollView 
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  tintColor={'skyblue'}
                  title={'Release to Refresh...'}
                />
              }
            >
              <Elements value={this.state.cryptoData} />
            </ScrollView>
          </View>
             
          <View style={styles.PinFooter}>

          </View>
        </View> 
      )}
  }
}
const styles = StyleSheet.create({
  PinContainer: {
    flex: 1,
    backgroundColor: '#cecece',
    alignSelf: 'stretch',
  },
  LoadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignSelf: 'stretch'
  },
  PinHeader: {
    flex: 0.35,
    marginLeft:10,
    marginRight:10,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 7,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'steelblue',
    backgroundColor: 'skyblue' 
  },
  PinHeaderText: {
    color: '#555555',
    fontSize: 40/winSize.scale,
    fontWeight: 'bold'
  },
  PinBody: {
    flex: 7,
    marginLeft:10,
    marginRight:10,
    borderRadius:15,
    borderColor: 'wheat',
    borderWidth: 2,
    backgroundColor: 'whitesmoke',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  TouchablePinBodyChild:{
    borderRadius: 15
  },
  PinBodyChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8
  },
  PinBodyChildText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  PinFooter: {
    flex: 2,
    backgroundColor: 'white',
  },

  text: {
    color: '#555555',
    fontSize: 40/winSize.scale,
  }
});
