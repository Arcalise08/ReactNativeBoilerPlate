import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {TextStyles} from "../GlobalStyles";

const {mainFont} = TextStyles;

const Home = ({_nav, _user}) => {
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={[mainFont.header, {marginBottom:35}]}>Home</Text>
            <TouchableOpacity onPress={() => _nav("Profile")}>
                <Text>To Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _nav("Matches")}>
                <Text>To Matches</Text>
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

export default connect(mapStateToProps)(Home);
