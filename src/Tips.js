import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ListViewModule from "./ListViewModule";
import DatePickerView from "./DatePicker";

class Tip extends Component {
  _openPhoneChargePage() {
    this.props.navigator.push({
      title:'话费充值',
      component:ListViewModule,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.upLine}></View>
          <Text style={styles.welcome}> 1. 支持移动、联通、电信的全国手机号码充值；</Text>
          <TouchableOpacity onPress={this._openPhoneChargePage.bind(this)}>
          <Text style={styles.welcome}> 2. 联通10元面值，不支持广东、北京两个地区；</Text>
          </TouchableOpacity>
          <Text style={styles.welcome}> 3. 充值成功后，被充值手机将收到所属运营商发送的成功充值短信（以所属运营商的相关服务为准），或请拨打4007-889-933查询充值情况；</Text>
          <Text style={styles.welcome}> 4. 如果您在支付15分钟后话费仍未到账，请与客服联系，给您带来的不便我们深表歉意；</Text>
          <Text style={styles.welcome}> 5. 如果您需要在充值完成后自动打印小票，请在安全中心>账户设置>开启【打印销售小票】；</Text>
          <Text style={styles.welcome}> 6. 如果您需要在输入充值手机号码时自动播报语音充值号码，请在安全中心>账户设置>开启【充值语音播报】。</Text>
          <Text style={styles.welcome}> 7. 该服务由深圳市年年卡网络科技有限公司提供。</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    marginTop:10,
  },
  welcome: {
    fontSize: 16,
    textAlign: 'left',
    margin: 10,

    fontWeight: 'normal',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  upLine: {
    marginTop : 0,
    height: 2,
    backgroundColor : '#DFDFDF',
  },
});

module.exports = Tip;