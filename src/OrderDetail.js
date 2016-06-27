import React, { Component } from 'react';
import {
	AppRegistry,
	Image,
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Alert,
} from 'react-native';
import ResultPage from "./ResultPage";
import Config from "./Config";
var JSBridgeManager = require('react-native').NativeModules.JSBridgeManage;
var { NativeAppEventEmitter } = require('react-native');

class OrderDetail extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(this.props);
		var subscription = NativeAppEventEmitter.addListener(
			'EventReminder',
			(reminder) => console.log(reminder.name)
		);
		subscription.remove();
	}


	_orderPayment() {
		fetch('http://wap.007ka.cn/NNkweixinPayers/weixinPayApp/jsApiParameters.php', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			body: Config.serialize({
				orderid: this.props.orderId,
				amount: '0.01',
				agentType: 'IOS',
				chargeType: 'TalkRecharge',
			})
		})
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
				JSBridgeManager.addPaymentEvent(responseData, (a) => {
					console.log(a);
					Alert.alert(
						'title',
						a,
						[
							{ text: 'OK', onPress: () => console.log('OK Pressed!') },
						]
					)
					this._payResultPage(a);

				});

			}).catch((error) => {
				console.warn(error);
			})
			.done();


	}

	_payResultPage(payCode) {
		this.props.navigator.push({
			title: '支付结果',
			component: ResultPage,
			params: {
				payCode:payCode,
				orderInfo: this.props,
			},
		})
	}


	render() {
		return (
			<View style = {styles.flex1}>
				<ScrollView style ={styles.scrollStyle}>
					<View style={styles.viewStyle}>
						<View style={styles.rowStyle}>
							<Text style={styles.textStyle}>充值订单</Text>
							<Text style={styles.textStyle1}>{this.props.orderId}</Text>
						</View>
						<View style={[styles.rowStyle, { borderBottomWidth: 1 }]}>
							<Text style={styles.textStyle}>手机号码</Text>
							<Text style={styles.textStyle1}>{this.props.phone}</Text>
						</View>
						<View style={[styles.rowStyle, { marginTop: 10, borderWidth: 1 }]}>
							<Text style={styles.textStyle}>付款金额</Text>
							<Text style={[styles.textStyle1, { color: '#FF5500' }]}>￥{this.props.userPayAmount / 100}</Text>
						</View>
					</View>
				</ScrollView>
				<View style={styles.bottomStyle}>
					<View style={styles.bottomViewStyle}>
						<Text style={styles.totalStyle}>总计: ￥{this.props.userPayAmount / 100}</Text>
					</View>
					<TouchableOpacity onPress={this._orderPayment.bind(this) } style={styles.submitBtnStyle}>
						<Text style={styles.surePaymentStyle}>确认付款</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flex1: {
		flex: 1,
		backgroundColor: '#F2F2F2',
		flexDirection: 'column',
	},
	scrollStyle: {
		flex: 1,
		backgroundColor: '#F2F2F2',
	},
	viewStyle: {
		flex: 1,
		marginTop: 10,
		height: 168,
		flexDirection: 'column',
	},
	rowStyle: {
		flex: 1,
		flexDirection: 'row',
		borderTopWidth: 1,
		borderColor: '#e5e5e5',
		height: 52,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
	},
	textStyle: {
		flex: 1,
		color: '#333333',
		fontSize: 15,
		marginLeft: 10,
	},
	textStyle1: {
		flex: 1,
		color: '#333333',
		fontSize: 15,
		textAlign: 'right',
		marginRight: 10,
	},
	bottomStyle: {
		flexDirection: 'row',
		backgroundColor: '#303030',
		height: 57,
	},
	bottomViewStyle: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	submitBtnStyle: {
		backgroundColor: '#459bfb',
		width: 140,
		alignItems: 'center',
		justifyContent: 'center',

	},
	totalStyle: {
		marginLeft: 20,
		fontSize: 19,
		color: '#FFFFFF',
		fontWeight: 'bold',
	},
	surePaymentStyle: {
		fontSize: 22,
		color: '#FFFFFF',
	},
});

module.exports = OrderDetail;

