import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {TextStyles} from "../GlobalStyles";

const {mainFont} = TextStyles;

const Tutorial = ({_nav, _user}) => {
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={[mainFont.header, {marginBottom:35}]}>
                Tutorial
            </Text>
            <Text style={[mainFont.md, {marginTop:35, textAlign:"center"}]}>
                Nowhere to go from here. You must toggle tutorial to true to navigate further
            </Text>
        </View>
    )
}

let mapStateToProps = state => {
    return {
        _user: state._user,
        _nav: state._nav
    }
}

export default connect(mapStateToProps)(Tutorial);
