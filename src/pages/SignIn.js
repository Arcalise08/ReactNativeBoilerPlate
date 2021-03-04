import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {TextStyles} from "../GlobalStyles";

const {mainFont} = TextStyles;
const SignIn = ({_nav}) => {
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={[mainFont.lg, {marginBottom:35}]}>SignIn</Text>
            <TouchableOpacity onPress={() => _nav("SignUp")}>
                <Text>To SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _nav("Landing")}>
                <Text>To Landing</Text>
            </TouchableOpacity>
        </View>
    )
}

let mapStateToProps = state => {
    return {
        _nav: state._nav
    }
}

export default connect(mapStateToProps)(SignIn);
