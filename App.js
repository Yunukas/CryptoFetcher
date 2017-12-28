import React, { Component } from 'react';
import { Alert, FlatList, Dimensions, StyleSheet, Text, View, TouchableHighlight, ListView, RefreshControl } from 'react-native';
import api from './utilities';

let winSize = Dimensions.get('window');

class MyListItem extends Component {
  // show alert on press ( symbol + price $)
  handlePress(i,j){
    Alert.alert(i + ' $' + j ); 
    //console.log('press');
  }
  handleLongPress(){
    //console.log('longPress');
  }
  
  render(){
    let textColor = this.props.change[0]== "-" ? "red" : "green";
    
    return(   
        <TouchableHighlight
          style={styles.TouchablePinBodyChild}
          key={this.props.id} 
          onPress={this.handlePress.bind(this, this.props.symbol, this.props.price)}
          onLongPress={this.handleLongPress}>
          <View style={styles.PinBodyChild}>
            <View style={styles.PinBody1Child}>
              <Text style={styles.text}>{this.props.id+1})</Text>
            </View>
            <View style={styles.PinBody2Child}>
              <View style={styles.PinBody2GrandChild}>
                <Text style={styles.text}>{this.props.symbol}</Text>
                <Text style={styles.subText}>{this.props.name}</Text>
              </View>
            </View>
            <View style={styles.PinBody3Child}><Text style={styles.text}>${this.props.price}</Text></View>
            <View style={styles.PinBody4Child}><Text style={styles.text}><Text style={{color: textColor}}>%{this.props.change}</Text></Text></View>
          </View>
        </TouchableHighlight>
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

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item, index}) => (
    <MyListItem
      id={index}
      symbol={item.symbol}
      name={item.name}
      price={item.price_usd}
      change= {item.percent_change_24h}
    />
  );

  _renderSeparator(){ 
    return(
      <View
        style={{
          backgroundColor: 'wheat',
          height: 1,
        }}
      />
    );
  }
  render() {
    if (this.state.isLoading) {
      return (<View style={styles.LoadingContainer}><Text>Loading...</Text></View>)
    }else{
      return(
        <View style={styles.PinContainer}>
          <View style={styles.PinHeader}>
            <View style={styles.PinHeader1Child}><Text style={styles.PinHeaderText}>#</Text></View>
            <View style={styles.PinHeader2Child}><Text style={styles.PinHeaderText}>Coin</Text></View>
            <View style={styles.PinHeader3Child}><Text style={styles.PinHeaderText}>Price</Text></View>
            <View style={styles.PinHeader4Child}><Text style={styles.PinHeaderText}>Change(24H)</Text></View>
          </View>
          <View style={styles.PinBody}>
            <FlatList 
              ItemSeparatorComponent={this._renderSeparator}
              data={this.state.cryptoData}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  tintColor={'skyblue'}
                  title={'Release to Refresh...'}
                />
              }
            />
          </View>
        </View> 
      )}
  }
}
const styles = StyleSheet.create({
  PinContainer: {
    flex: 1,
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
    alignItems: 'flex-start',
    padding: 7,
    borderBottomWidth: 2,
    borderBottomColor: '#555555' 
  },
  PinHeader1Child: {
    flex:1.7,
  },
  PinHeader2Child: {
    flex:3.5,  
  },
  PinHeader3Child: {
    flex:6,
  },
  PinHeader4Child: {
    flex:5,
  },
  PinHeaderText: {
    color: '#555555',
    fontSize: 35/winSize.scale,
    fontFamily: 'GillSans-Bold'
  },
  PinBody: {
    flex: 7,
    marginLeft:10,
    marginRight:10,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  TouchablePinBodyChild:{
    borderRadius: 15
  },
  PinBodyChild: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
    marginTop: 20
  },
  PinBody1Child: {
    flex:1.7,
  },
  PinBody2Child: {
    flex:3.5,
  },
  PinBody2GrandChild: {
    flexDirection: 'column'
  },
  PinBody3Child: {
    flex:6,
  },
  PinBody4Child: {
    flex:5,
  },
  PinBodyChildText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  text: {
    color: '#555555',
    fontSize: 42/winSize.scale,
    fontFamily: 'Gill Sans'
  },
  subText: {
    fontSize: 20/winSize.scale,
    fontFamily: 'GillSans-Light'
  }
});
