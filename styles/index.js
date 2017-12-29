import { 
	StyleSheet, 
	Dimensions 
} from 'react-native';

let winSize = Dimensions.get('window');

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
		flex: 0.45,
		flexDirection: 'row',
		paddingTop: 27,
		backgroundColor: '#555555'
	},
	PinHeader1Child: {
		flex:1,
		justifyContent: 'flex-end',
		marginLeft: 20
	},
	PinHeader2Child: {
		flex:9,
		alignSelf: 'stretch',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 10,
	},
	PinHeader3Child: {
		flex:1,
		alignItems: 'flex-end',
	},
	PinHeaderText: {
		color: 'white',
		fontSize: 45/winSize.scale,
		fontFamily: 'GillSans-Light'
	},
	PinBody: {
		flex: 7,
		marginLeft:15,
		marginRight:15,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},
	TouchablePinBodyChild:{
    
	},
	PinBodyChild: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'flex-start',
		padding: 8,
		marginTop: 20
	},
	PinBody1Child: {
		flex:1,
	},
	PinBody2Child: {
		flex:3.5,
	},
	PinBody2GrandChild: {
		flexDirection: 'column'
	},
	PinBody3Child: {
		flex:6,
		alignItems: 'flex-end'
	},
	PinBody3GrandChild: {
		flexDirection: 'column'
	},
	PinBody3GrandChildSubText: {
		flexDirection: 'column',
		alignItems: 'flex-end'
	},
	separator: {
		backgroundColor: '#CED0CE',
		height: 1,	
	},
	text: {
		color: '#555555',
		fontSize: 42/winSize.scale,
		fontFamily: 'Gill Sans'
	},
	subText: {
		fontSize: 35/winSize.scale,
		fontFamily: 'GillSans-Light',
	},
	transparentBackground: {
		backgroundColor: 'transparent',
	}
});

module.exports = styles;