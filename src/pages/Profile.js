import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {TextStyles} from "../GlobalStyles";

const {mainFont} = TextStyles;

const Profile = ({_user, _nav}) => {
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={[mainFont.header, {marginBottom:35}]}>Profile</Text>
            <TouchableOpacity onPress={() => _nav("Home")}>
                <Text>To Home</Text>
            </TouchableOpacity>
        </View>
    )
}

let mapStateToProps = state => {
    return {
        _user: state._user,
        _nav: state._nav
    }
}

export default connect(mapStateToProps)(Profile);
