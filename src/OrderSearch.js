import React,{ Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import SearchResult from './SearchResult';
import DateTimer from 'react-native-datetime';
import Public from './Public';

class OrderResult extends Component{
    constructor(props){
        super(props);
        this.state={
            date:new Date(),
            startTime:null,
            endTime:null,
            phoneNum:null,
            orderId:null,
        };
    }
    
    _pushResultPage(){
        this.props.navigator.push({
            title:'查询结果',
            component:SearchResult,
            params:{
                startTime:this.state.startTime,
                endTime:this.state.endTime,
                orderId:this.state.orderId,
                phoneNum:this.state.phoneNum,
            }
        })   
    }

    _selectStartTime(){
        let date = this.state.date;
        this.picker.showDatePicker(date,(d) =>{
           console.log(d.getMonth()+1,d.getDate(),d.getFullYear());
           console.log(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate());
           this.setState({
               date:d,
               startTime:d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(),
               }) 
        });
        
    }
    
    _selectEndTime(){
        let date = this.state.date;
        this.picker.showDatePicker(date, (d) => {
            console.log(d.getMonth() + 1, d.getDate(), d.getFullYear());
            console.log(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
            this.setState({
                date: d,
                endTime: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
            })
        });
    }
    
    _phoneTextChange(textInput){
        console.log(textInput.nativeEvent.text);
        if(Public.checkMobile(textInput.nativeEvent.text)){
            this.setState({
                phoneNum:textInput.nativeEvent.text,
            });
        }
        
    }
    
    _orderNumTextEndEdit(textStr){
        console.log(textStr.nativeEvent.text);
        console.log(111);
        this.setState({orderId:textStr.nativeEvent.text});
    }
    
    render(){
        let startT;
        let endT;
        let sFontStyle;
        let eFontStyle;
        if(this.state.startTime === null){
            startT = '开始时间';
            sFontStyle = {
                color: '#999999',
            }
        }else{
            startT = this.state.startTime;
            sFontStyle = {
                color: '#000000',
            }
        }

        if (this.state.endTime === null) {
            endT = '结束时间';
            eFontStyle = {
                color: '#999999',
            }
        } else {
            endT = this.state.endTime;
            eFontStyle = {
                color: '#000000',
            }
        }
        
        return(
            <View style={styles.flex}>
                <ScrollView>
                    <View style={styles.menuStyle}>
                        <View style={[styles.rowStyle1,{borderTopWidth:1}]}>
                            <Text style={styles.rowTextStyle}>开始时间</Text>
                            <TouchableOpacity onPress={this._selectStartTime.bind(this)} style={styles.rowTouchStyle}>
                                <Text style={[styles.touchTextStyle,sFontStyle]}>{startT}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowStyle1}>
                            <Text style={styles.rowTextStyle}>结束时间</Text>
                            <TouchableOpacity onPress ={this._selectEndTime.bind(this)} style={styles.rowTouchStyle}>
                                <Text style={[styles.touchTextStyle,eFontStyle]}>{endT}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowStyle2}>
                            <Text style={styles.rowTextStyle}>订单号码</Text>    
                            <TextInput placeholder="请输入订单号码"  style={styles.textInputStyle} onEndEditing={this._orderNumTextEndEdit.bind(this)} keyboardType='numeric'/>   
                                     
                        </View>
                        <View style={[styles.rowStyle1,{borderTopWidth:1}]}>
                            <Text style={styles.rowTextStyle}>手机号码</Text>
                            <TextInput placeholder="请输入手机号码" style={styles.textInputStyle} onEndEditing={this._phoneTextChange.bind(this)} keyboardType='numeric'/>   
                        </View>
                    </View>
                    <Text style={styles.tipTextStyle}>输入为空则全部查询</Text>
                    <TouchableOpacity onPress={this._pushResultPage.bind(this)} style={styles.nextBtnStyle}>
                        <Text style={styles.textStyle}>下一步</Text>
                    </TouchableOpacity>
                </ScrollView>
                <DateTimer ref={(picker)=>{this.picker=picker}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#F2F2F2',
    },
    menuStyle:{
        flex:1,
        marginTop:10,
        height:220,
        backgroundColor:'#F2F2F2',
    },
    tipTextStyle:{
        color:'#8b8b8b',
        marginTop:15,
        marginLeft:10,
    },
    rowStyle1:{
        flex:1,
        height:52,
        backgroundColor:'white',
        borderColor:'#e5e5e5',
        borderBottomWidth:1,
        flexDirection:'row',
     },
    rowStyle2:{
        height:52,
        backgroundColor:'white',   
        borderTopWidth:1,
        marginTop:15,
        borderColor:'#e5e5e5',
        flexDirection:'row',
    },
    rowTextStyle:{
        flex:1,
        fontSize:16,
        color:'#333333',
        marginLeft:10,
        marginTop:15,
        width:120,
    },
    rowTouchStyle:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center',
    },
    touchTextStyle:{
        marginRight:15,
        fontSize:16,
    },
    textInputStyle:{
        height:52,
        fontSize:15,
        width:250,
        textAlign:'right',
        paddingRight:15,
    },
    nextBtnStyle:{
        flex:1,
        marginTop:40,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#459bfb',
        height:44,
        alignItems:'center',
        justifyContent:'center',
    },
    textStyle:{
        fontSize:22,
        color:'#FFFFFF',
    },    
});

module.exports = OrderResult;