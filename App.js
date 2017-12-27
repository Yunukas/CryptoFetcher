import React, { Component } from 'react';
import { FlatList, Dimensions, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
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
    let values = this.props.value;
    let result;
    result = values.map((element, index) => (

        <TouchableHighlight
          style={styles.TouchablePinBodyChild}
          key={index} 
          onPress={this.handlePress}
          onLongPress={this.handleLongPress}>
          <View style={styles.PinBodyChild}>
            <View style={styles.PinBodyChildText}>
              <Text style={styles.text}>{element.symbol}</Text>
            </View>
            <View style={styles.PinBodyChildText}><Text style={styles.text}>{element.price_usd}</Text></View>
            <View style={styles.PinBodyChildText}><Text style={styles.text}>{element.percent_change_24h}</Text></View>
          </View>
        </TouchableHighlight>
    ));


    return(
      result
    );
  }
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      cryptoData: [],
    }
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
      let rows = [];
      for(let value of this.state.cryptoData)
       rows.push(value.symbol, value.price_usd, value.percent_change_24h);
      return(
        <View style={styles.PinContainer}>
          <View style={styles.PinHeader}>
            <View style={styles.PinBodyChildText}><Text style={styles.PinHeaderText}>Type</Text></View>
            <View style={styles.PinBodyChildText}><Text style={styles.PinHeaderText}>Price</Text></View>
            <View style={styles.PinBodyChildText}><Text style={styles.PinHeaderText}>% Change</Text></View>
          </View>
          <View style={styles.PinBody}>
            <Elements value={this.state.cryptoData} />
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
    flex: 5,
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
