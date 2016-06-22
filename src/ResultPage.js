import React, { Component } from 'react';
import {
	AppRegistry,
	Image,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import Config from './config';

class ResultPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			acceptTime: '2016-6-17 16:39:40',
			params: {
				page: 1,
				pageSize: 1,
				orderType: 1,
				orderId: this.props.orderInfo.orderId,
			}
		};

	}


	componentDidMount() {
		console.log(this.state.acceptTime);
		console.log(this.props);
		fetch(Config.servicePath + 'commen/queryorder.htm', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			body: Config.serialize({
				merId: 'weiBank428',
				userId: '100101004',
				data: JSON.stringify(this.state.params),
				format: 'json',
			})
		})
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData.data);
				let arr = JSON.parse(responseData.data);
				let data = arr[0];
				console.log(data.acceptTime);
				this.setState({
					acceptTime: data.acceptTime,
				});
			}).catch((error) => {
				console.warn(error);
			})
			.done();
	}

	_sureBtnAction() {
		this.props.navigator.popToTop();
	}

	render() {
		let imgSource;
		let payTitle;
		let payStyle;
		console.log(this.props.payCode);
		if (this.props.payCode == 0) {
			payTitle = '支付成功';
			imgSource = require('../img/success.png');
			paystyl = {
				color: '#00bf57',
			};
		}else{
			payTitle = '支付失败';
			imgSource = require('../img/error.png');
			paystyl = {
				color: 'red',
			};
		}

		return (
			<View style = {styles.flex}>
				<ScrollView>
					<View style={styles.resultIconStyle}>
						<Image source={imgSource} style={styles.tipImageStyle}/>
						<Text style={[styles.tipTextStyle, paystyl]}>{payTitle}</Text>
					</View>
					<View style={styles.viewStyle1}>
						<Text style={styles.textStyle1}>订单号</Text>
						<Text style={styles.textStyle2}>{this.props.orderInfo.orderId}</Text>
					</View>
					<View style={styles.viewStyle2}>
						<Text style={styles.textStyle3}>下单时间</Text>
						<Text style={styles.textStyle4}>{this.state.acceptTime}</Text>
					</View>
					<View style={styles.viewStyle2}>
						<Text style={styles.textStyle3}>付款时间</Text>
						<Text style={styles.textStyle4}>{this.state.acceptTime}</Text>
					</View>
					<View style={styles.viewStyle2}>
						<Text style={styles.textStyle3}>付款金额</Text>
						<Text style={[styles.textStyle4, { color: 'red' }]}>￥{this.props.orderInfo.userPayAmount / 100}元</Text>
					</View>
					<View style={[styles.viewStyle2, { borderBottomWidth: 1 }]}>
						<Text style={styles.textStyle3}>充值号码</Text>
						<Text style={styles.textStyle4}>{this.props.orderInfo.phone}</Text>
					</View>
					<TouchableOpacity onPress={this._sureBtnAction.bind(this) } style={styles.touchViewStyle}>
						<Text style={styles.touchBtnStyle}>确定</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#F2F2F2',
	},
	resultIconStyle: {
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	tipImageStyle: {
		height: 40,
		width: 40,
	},
	tipTextStyle: {
		fontSize: 22,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	viewStyle1: {
		height: 77,
		backgroundColor: '#FFFFFF',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 1,
		borderColor: '#dfdfdf',
	},
	textStyle1: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	textStyle2: {
		marginTop: 5,
		fontSize: 27,
		color: '#ff5500',
	},
	viewStyle2: {
		flexDirection: 'row',
		height: 45,
		backgroundColor: '#FFFFFF',
		borderTopWidth: 1,
		borderColor: '#dfdfdf',
		alignItems: 'center',
	},
	textStyle3: {
		flex: 1,
		fontSize: 16,
		marginLeft: 10,
		color: '#333333',
	},
	textStyle4: {
		fontSize: 16,
		marginRight: 10,
		color: '#333333',
		textAlign: 'right',
	},
	touchViewStyle: {
		height: 44,
		backgroundColor: '#459bfb',
		marginLeft: 10,
		marginRight: 10,
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	touchBtnStyle: {
		color: '#ffffff',
		fontSize: 18,
	},
});

module.exports = ResultPage;