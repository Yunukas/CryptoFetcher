import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import api from './utilities';

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
          key={index} 
          onPress={this.handlePress}
          onLongPress={this.handleLongPress}>
          <View style={styles.PinBodyChild}>
            <Text style={styles.text}>{element.symbol}</Text>
            <Text style={styles.text}>{element.price_usd}</Text>
            <Text style={styles.text}>{element.percent_change_24h}</Text>
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
            <View><Text style={styles.text}>Type</Text></View>
            <View><Text style={styles.text}>Price</Text></View>
            <View><Text style={styles.text}>% Change</Text></View>
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
    flex: 0.5,
    backgroundColor: 'white',
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 5,
    borderWidth: 2, 
  },
  PinBody: {
    flex: 5,
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 8
  },
  PinBodyChild: {
   borderWidth: 1,
   borderColor: 'black',
   flexDirection: 'row',
   justifyContent: 'space-between',
  },
  PinFooter: {
    flex: 5,
    backgroundColor: 'red'
  },

  text: {
    color: '#555555',
    fontSize: 20
  }
});
