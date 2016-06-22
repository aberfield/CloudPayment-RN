import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
	Text,
	TextInput,
	Alert,
	Image,
	Dimensions,
} from 'react-native';
import OrderDetail from "./OrderDetail";
import ResultPage from "./ResultPage";
import Tips from "./Tips";
import OrderSearch from "./OrderSearch";
import Config from "./config";
import Public from "./Public";
const {width, height} = Dimensions.get('window');

class PhoneCharge extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneInfo: null,
			phoneNumber: null,
			selectIndex: 0,
			selectAmount: 10,
			cellCore: null,
			loadedInfo: null,
		};
	}

	componentDidMount() {

	}

	fetchData(phoneNum) {
		fetch(Config.servicePath + 'mobilecharge/getmobinfo.htm', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			body: Config.serialize({
				merId: 'weiBank428',
				userId: '100101004',
				data: JSON.stringify({ phoneNumber: phoneNum }),
				format: 'json',
			})
		})
			.then((response) => response.json())
			.then((responseData) => {
				let data = JSON.parse(responseData.data);
				console.log(data);
				this.setState({
					loadedInfo: responseData.ackDesc,
					cellCore: data.province + data.city + Config.CellCore[data.operId],
				});
			}).catch((error) => {
				console.warn(error);
			})
			.done();
	}

	_submitOrder() {
		console.log(this.state.phoneNumber);
		fetch(Config.servicePath + 'mobilecharge/order.htm', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			body: Config.serialize({
				merId: 'weiBank428',
				userId: '100101004',
				data: JSON.stringify({ phoneNumber: this.state.phoneNumber, amount: this.state.selectAmount * 100 }),
				format: 'json',
			})
		})
			.then((response) => response.json())
			.then((responseData) => {
				let data = JSON.parse(responseData.data);
				console.log(data.orderInfo);
				this._pushNextPage(data.orderInfo);
			}).catch((error) => {
				console.warn(error);
			})
			.done();

	}

	_pushNextPage(orderInfo) {
		this.props.navigator.push({
			title: '订单详情',
			component: OrderDetail,
			params: orderInfo,

		})
	}

	_pushTipPage() {
		this.props.navigator.push({
			title: '提示',
			component: Tips,
		})
	}
	_pushOrderPage() {
		this.props.navigator.push({
			title: '缴费查询',
			component: OrderSearch,
		})
	}

	_textChange(textStr) {
		if (Public.checkMobile(textStr)) {
			console.log(textStr);
			this.setState({
				phoneNumber: textStr,
			});
			this.fetchData(textStr);
			
		}

	}

	_selectAmount(item) {
		console.log(item);
		this.setState({
			selectIndex: item.type,
			selectAmount: item.des,
		});
	}

	render() {
		let itemSpace;
		let borderC;
		let textC;
		let content = Config.ChargeItems.map((item, index) => {
			if ((index + 1) % 3 === 0) {
				itemSpace = {
					marginRight: 0,
				}
			} else {
				itemSpace = {
					marginRight: marginR,
				}
			};
			if (index === this.state.selectIndex) {
				borderC = {
					borderColor: '#459bfb',
				},
					textC = {
						color: '#459bfb',
						fontSize: 17,
					}
			} else {
				borderC = {
					borderColor: '#bfbfbf',
				},
					textC = {
						color: '#888888',
						fontSize: 17,
					}
			}
			return (
				<TouchableOpacity key={'chargeType-' + index} onPress={this._selectAmount.bind(this, item) }>
					<View style={[styles.chargeItems, itemSpace, borderC]}>
						<Text style={[textC]}>
							{item.des}元
						</Text>
					</View>
				</TouchableOpacity>
			);
		});
		let paymentView = ((amount) => {
			return (
				<View style={styles.paymentViewStyle}>
					<Text style={styles.paymentText1}>支付金额: </Text>
					<Text style={styles.paymentText2}>￥{amount}</Text>
				</View>
			);
		});
		let rechargeAmountView = this.state.loadedInfo === '处理成功' ? content : null;
		let amountShowView = this.state.loadedInfo === '处理成功' ? paymentView(this.state.selectAmount) : null;

		return (
			<View style={styles.container}>
				<ScrollView style={styles.container}>
					<View style={styles.textInputViewStyle}>
						<TextInput style={styles.inputStyle} placeholder="请输入手机号码(移动、联通、电信)" keyboardType='numeric' onChangeText={this._textChange.bind(this) } />
						<Text style={styles.cellCoreStyle}>{this.state.cellCore}</Text>
					</View>
					<View style={styles.amountStyle}>
						{rechargeAmountView}
						{amountShowView}
					</View>
					<TouchableOpacity onPress={this._submitOrder.bind(this) }>
						<View style={styles.submitStyle}>
							<Text style={styles.textStyle}>下一步</Text>
						</View>
					</TouchableOpacity>
				</ScrollView>
				<View style={styles.bottomStyle}>
					<TouchableOpacity onPress={this._pushTipPage.bind(this) } style={[styles.bottomStyle1, { borderRightWidth: 1, borderColor: '#e5e5e5' }]}>
						<Image source={require('../img/tip.png') } style={styles.imageStyle}/>
						<Text style={styles.bottomTextStyle}> 相关提示</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._pushOrderPage.bind(this) } style={styles.bottomStyle1}>
						<Image source={require('../img/order.png') } style={styles.imageStyle}/>
						<Text style={styles.bottomTextStyle}> 缴费记录</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}


}

const paddingHor = 10;
const itemWidth = 94;
const marginR = (width - 3 * itemWidth - paddingHor * 2) / 2;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#F2F2F2',
	},
    chargeItems: {
        width: itemWidth,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
		marginTop: 10,
    },
	paymentViewStyle: {
		flexDirection: 'row',
		height: 40,
		marginTop: 20,
	},
	paymentText1: {
		marginRight: 10,
		color: '#494949',
		fontSize: 18,
		fontWeight: 'bold',
		height: 40,
	},
	paymentText2: {
		marginRight: 5,
		color: 'red',
		fontSize: 18,
		fontWeight: 'bold',
		height: 40,
	},
	amountStyle: {
		marginTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#F2F2F2',
        paddingLeft: paddingHor,
        paddingRight: paddingHor
	},
	textInputViewStyle: {
		marginTop: 10,
		flexDirection: 'row',
		height: 50,
		borderWidth: 1,
		borderColor: '#e5e5e5',
		backgroundColor: 'white',
	},
	inputStyle: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 8,
		borderRadius: 4,
		fontSize: 16,
		backgroundColor: '#FFFFFF',
	},
	cellCoreStyle: {
		width: 110,
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 15,
		paddingRight: 5,
		color: '#424242',
	},
	submitStyle: {
		flex: 1,
		backgroundColor: '#459BFB',
		marginTop: 15,
		marginLeft: 10,
		marginRight: 10,
		height: 46,
	},
	textStyle: {
		color: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 10,
		textAlign: 'center',
	},
	flexView: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#F2F2F2',
		marginTop: 0,
		height: 400,
	},
	bottomStyle: {
		borderTopWidth: 1,
		borderColor: '#e5e5e5',
		height: 60,
		backgroundColor: '#F2F2F2',
		justifyContent: 'center',
		marginTop: 0,
		flexDirection: 'row',
	},
	bottomStyle1: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#F2F2F2',
	},
	imageStyle: {
		width: 29,
		height: 30,
	},
	bottomTextStyle: {
		color: '#7a7a7a',
		fontSize: 16,
	},

});

module.exports = PhoneCharge;