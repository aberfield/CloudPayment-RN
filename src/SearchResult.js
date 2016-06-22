import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native';
import Config from './config';


class SearchResult extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(['row 1']),
      totalNum: 0,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillMount() {
    this.setState({
      params: {
        page: 1,
        pageSize: 20,
        orderType: 1,
        mob: this.props.phoneNum ? this.props.phoneNum : "",
        orderId: this.props.orderId ? this.props.orderId : "",
        startTime: this.props.startTime ? this.props.startTime + " 00:00:00" : " ",
        endTime: this.props.endTime ? this.props.endTime + " 23:59:59" : " "
      }
    });
  }

  fetchData() {
    console.log(this.state.params);
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
        console.log(responseData.totalNum);
        if (responseData.totalNum === 0) return;
        let data = JSON.parse(responseData.data);
        console.log(data);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          totalNum: responseData.totalNum,
        });
      }).catch((error) => {
        console.warn(error);
      })
      .done();
  }

  _payContine(data){
    console.log(data);
  }


  render() {
    let {dataSource, m} = this.state;

    if (this.state.totalNum === 0) {
      return this.renderNoOrderView();
    }

    return (
      <ListView
        style={styles.listViewStyle}
        dataSource={this.state.dataSource}
        renderRow={this.renderTextRow.bind(this) }
        />
    );
  }

  renderNoOrderView() {
    return (
      <View style={styles.listViewStyle}>
        <Text style={[{ textAlign: 'center', marginTop: 10 }]}>亲，您没有充值记录</Text>
      </View>
    );
  }

  renderPayView(data) {
    return (
      <View style={styles.buttonViewStyle}>
        <TouchableOpacity style={styles.buttonStyle} onPress={this._payContine.bind(this,data)}>
          <Text style={styles.buttonTextStyle}>继续支付</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderTextRow(data) {
    console.log(data);
    let payView =  (data.orderState === 20 || data.orderState === 23)?this.renderPayView(data):null;

    return (
      <View style={styles.rowStyle}>
        <View style={styles.viewStyle1}>
          <Text style={styles.textStyle1}>订单号: {data.berbonOrderId}</Text>
          <Text style={styles.textStyle2}>{Config.orderState(data.orderState) }</Text>
        </View>
        <View style={styles.viewStyle2}>
          <View style={styles.viewStyle3}>
            <Text style={styles.textStyle3}>充值时间: </Text>
            <Text style={styles.textStyle3}>{data.acceptTime}</Text>
          </View>
          <View style={styles.viewStyle3}>
            <Text style={styles.textStyle3}>充值号码: </Text>
            <Text style={styles.textStyle3}>{data.account}</Text>
          </View>
          <View style={styles.viewStyle3}>
            <Text style={styles.textStyle3}>充值金额: </Text>
            <Text style={[styles.textStyle3, { color: 'red' }]}>￥{data.orderAmount / 100}</Text>
          </View>
        </View>
        {payView}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  flex: {
	  	flex: 1,
	  	backgroundColor: 'red',
  },
  listViewStyle: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  rowStyle: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    height: 180,
  },
  viewStyle1: {
    height: 35,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#dfdfdf',
  },
  viewStyle2: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#dfdfdf',
    height: 70,
  },
  textStyle1: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#222222',
  },
  textStyle2: {
    marginRight: 10,
    color: 'red',
    fontSize: 15,
  },
  viewStyle3: {
    flex: 1,
    flexDirection: 'row',
  },
  textStyle3: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
    color: '#222222',
  },
  buttonViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 38,

  },
  buttonStyle: {
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#459bfb',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 28,
    width: 75,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: '#459bfb',
    fontSize: 15,
  },
});


module.exports = SearchResult;

