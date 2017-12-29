import React, { Component } from 'react';
import styles from './styles';
import { 
	Alert, 
	FlatList,
	StatusBar,  
	Text, 
	View, 
	TouchableHighlight, 
	RefreshControl 
} from 'react-native';
import { Button } from 'react-native-elements';
import api from './utilities';


class MyListItem extends React.Component {
	// show alert on press ( symbol + price $)
	handlePress(i,j){
		Alert.alert(i + ' $' + j ); 
		//console.log('press');
	}
	handleLongPress(){
		//console.log('longPress');
	}
  
	render(){
		let textColor = this.props.change[0]== '-' ? 'tomato' : 'limegreen';
    
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
					<View style={styles.PinBody3Child}>
						<View style={styles.PinBody3GrandChild}>
							<Text style={styles.text}>${this.props.price}</Text>
							<View style={styles.PinBody3GrandChildSubText}>
								<Text style={styles.subText}>
									<Text style={{color: textColor}}>%{this.props.change}</Text>
								</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			cryptoData: [],
			refreshing: false
		};
	}
  

	// pull down to refresh function
	_onRefresh() {
		this.setState({
			refreshing: true
		});
		api.GetCryptoData().then((response) => {
			this.setState({
				cryptoData: response,
				refreshing: false
			});
		});
	}
  
	// get data after components mount
	componentDidMount() {
		api.GetCryptoData().then((response) => {
			this.setState({
				isLoading: false,
				cryptoData: response
			});
		});
	}

	_keyExtractor = (item) => item.id;

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
				style={styles.separator}
			/>
		);
	}
	render() {
		if (this.state.isLoading) {
			return (<View style={styles.LoadingContainer}><Text>Loading...</Text></View>);
		} else {
			return(
				<View style={styles.PinContainer}>
					<StatusBar
						barStyle="light-content"
					/>
					<View style={styles.PinHeader}>
						<View style={styles.PinHeader1Child}>
							<Button
								icon={{name: 'add', size: 16}}
								buttonStyle={styles.transparentBackground}
								textStyle=''
								title=''
							/>
						</View>
						<View style={styles.PinHeader2Child}>
							<Text style={styles.PinHeaderText}>Watchlist</Text>
						</View>
						<View  style={styles.PinHeader3Child}>
							<Button
								icon={{name: 'share', size: 16}}
								buttonStyle={styles.transparentBackground}
								textStyle=''
								title=''
							/>
						</View>
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
			);}
	}
}

