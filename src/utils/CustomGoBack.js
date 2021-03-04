import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {useFocusEffect, useNavigationState} from "@react-navigation/native";
import {connect} from "react-redux";
import {_showActionSheet} from "../redux/thunk";

const CustomBackFunction = ({ isActionSheetActive, _showActionSheet}) => {

    useFocusEffect(
        React.useCallback(() => {
            console.log("using effect")
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const onBackPress = () => {
        if (isActionSheetActive) {
            _showActionSheet(false)
            return true;
        }

       return false;
    }

    return <></>
}

let mapStateToProps = state => {
    return {
        userData: state.userData,
        isActionSheetActive: state._actionSheet,
    }
}

export default connect(mapStateToProps, {_showActionSheet})(CustomBackFunction);
