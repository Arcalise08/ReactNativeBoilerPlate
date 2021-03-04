import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Colors, ImagePlaceholders} from "../../GlobalStyles";
import {connect} from "react-redux";


const NavBar = ({ _showActionSheet, _logout, children }) => {

    return (
        <View style={{flex: 1, backgroundColor: Colors.appBackground}}>
            {children}
        </View>
    )
}

let mapStateToProps = state => {
    return {
        _user: state._user,
        _nav: state._nav
    }
}

export default connect(mapStateToProps)(NavBar);
