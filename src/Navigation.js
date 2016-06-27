import React, { Component } from 'react';
import {
	Appregistry,
	StyleSheet,
	Navigator,
	View,
	TouchableOpacity,
	Text,
	Platform,
	Image,
} from 'react-native';

import PhoneCharge from "./PhoneCharge";

const defaultRoute = {
  component: PhoneCharge	//定义Navigator根视图
};

class Navigation extends Component {
	//在pop push jump 的状态下传递name，component参数
	_renderScene(route, navigator){
		let Component = route.component;
		return (
			<Component {...route.params} navigator={navigator} />
			);
	}
	//NavigationBar的样式
	_renderNavBar() {
		const styles = {
			title: {
				flex: 1, alignItems: 'center', justifyContent: 'center',
			},
			button:{
				flex: 1, width: 50, alignItems: 'center', justifyContent: 'center',
			},
			buttonText: {
				fontSize: 18,color: '#000000',fontWeight:'400',
			}
		}

		var routeMapper = {
			LeftButton(route, navigator, index, navState) {
				if (index > 0) {
					return (
						<TouchableOpacity onPress={() => navigator.pop()}
						style={styles.button}>
						<Image source={require('../img/back.png')}  style={{width:18,height:33}}/>
						</TouchableOpacity>
					);
				} else {
					return(
						<TouchableOpacity onPress={() => navigator.pop()}
						style={styles.button}>
						<Text style={styles.buttonText}></Text>
						</TouchableOpacity>
					);
				}
			},
			RightButton(route, navigator, index, navState) {
					if (index > 0 && route.rightButton) {
						return(
							<TouchableOpacity onPress={() => navigator.pop}
							style = {styles.button}>
							<Text style = {styles.buttonText}>跳转</Text>
							</TouchableOpacity>
						);
					}else{
						return(
							<TouchableOpacity onPress={() => navigator.pop}
							style = {styles.button}>
							<Text style = {styles.buttonText}></Text>
							</TouchableOpacity>
						);
					}
			},
			Title(route, navigator, index ,navState) {
				return(
					<View style = {styles.title}>
						<Text style={[styles.buttonText,{fontWeight:'bold'}]}>{route.title ? route.title: '话费充值'}</Text>
					</View>

				);
			}	
		};
		return (
			<Navigator.NavigationBar
				style = {{
					alignItems: 'center',
					backgroundColor: '#F6F6F6',
					shadowOffset: {
						width: 1,
						height: 0.5,
					},
					borderBottomWidth:1,
					borderColor:'#b3b3b3',
					shadowColor: '#F6F6F6',
					shadowOpacity: 0.8,
				}}
				routeMapper={routeMapper}
			/>
		);
	}

	render() {
		return(
			<Navigator 
				initialRoute = {defaultRoute}
				renderScene = {this._renderScene}
				sceneStyle={{paddingTop: (Platform.OS === 'android' ? 64 : 64)}}
				navigationBar={this._renderNavBar()} />
		);
	}
}

const styles = StyleSheet.create({
	navigationStyle: {
		backgroundColor: '#FFFFFF',
	},

});

module.exports = Navigation;