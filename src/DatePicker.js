import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import DatePickerView from 'react-native-datepicker';
import DateTimer from 'react-native-datetime';

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            

        };
    }
    
    getInitiaState(){
        return{
            date:new Date(),
        }
    }
    
    showDatePicker(){
        var date = this.state.date;
        console.log(date);
        this.picker.showDatePicker(date,(d)=>{
            this.setState({date:d});  
        });
    }
    
    onDateChange(){
        console.log(this.state.date);
    }



    componentDidMount() {

    }

    render() {

        return (
            <View style={styles.container}>
               <TouchableOpacity onPress={this.showDatePicker.bind(this)} style={styles.btnStyle}>
                    <Text>11111</Text>
               </TouchableOpacity> 
               <DateTimer ref={(picker)=>{this.picker=picker}}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    btnStyle:{
        backgroundColor:'red',
        height:80,
        width:60,
        marginTop:20,
    },
});

module.exports = DatePicker;