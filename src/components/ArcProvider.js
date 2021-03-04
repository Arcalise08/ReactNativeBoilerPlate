import React, {useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, View, StatusBar} from 'react-native';
import {Colors, DIM_BACKGROUND_IN, DIM_BACKGROUND_OUT, MAIN_PROVIDER_PRIORITY} from "../GlobalStyles";
import {connect} from "react-redux";
import {_showActionSheet} from "../redux/thunk";


const ArcProvider = ({children, isDimBackground}) => {
    const [active, setActive] = useState(false);
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isDimBackground && !active) {
            transitionIn()
        }
        if (!isDimBackground && active) {
            transitionOut()
        }


    }, [isDimBackground]);

    const transitionIn = () => {
        anim.setValue(0)
        setActive(true);
        Animated.timing(anim, {
            toValue: 1,
            duration: DIM_BACKGROUND_IN,
            useNativeDriver:false
        }).start();

    }

    const transitionOut = () => {
        anim.setValue(1)
        Animated.timing(anim, {
            toValue: 0,
            duration: DIM_BACKGROUND_OUT,
            useNativeDriver:false
        }).start();

        setTimeout(() => {
            setActive(false)
        }, DIM_BACKGROUND_OUT)
    }

    const bgInterpolation = anim.interpolate({
        inputRange: [0, 1],
        outputRange: ["transparent",Colors.dimBackground]
    })


    return (
        <SafeAreaView style={{flex:1, backgroundColor:"black", position:"relative", zIndex: 1}}>
            <StatusBar backgroundColor={"black"}/>
            <View style={{position:"absolute", left:0, right:0, top:0, bottom:0,  zIndex: active ? MAIN_PROVIDER_PRIORITY : -5,}}>
                <Animated.View style={{flex:1, backgroundColor:bgInterpolation}}/>
            </View>

            {children}
        </SafeAreaView>
    )
}

let mapStateToProps = state => {
    return {
        isDimBackground: state.dimBackground,
    }
}

export default connect(mapStateToProps, {_showActionSheet})(ArcProvider);
