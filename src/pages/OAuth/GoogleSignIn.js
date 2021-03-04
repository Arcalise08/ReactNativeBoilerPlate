import React from 'react';
import {Image, Pressable} from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import g_branding from "../../../assets/OAuth/g_logo.png"

export default class GoogleOAuth extends React.Component {
    state = {user: null};

    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        this.signOutAsync()
    }


    initAsync = async () => {
        await GoogleSignIn.initAsync({
            scopes: ['openid', 'profile', 'email'],
        });
        this._syncUserWithStateAsync();
    };

    _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        this.setState({user: user});
        await this.props.signIn(user.auth.idToken);

    }


    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.setState({user: null});
    };

    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const {type, token} = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                await this._syncUserWithStateAsync();
            }
        } catch ({message}) {
            alert('Error: ' + message);
        }
    };


    onPress = () => {
        if (this.state.user) {
            this.signOutAsync();
        } else {
            this.signInAsync();
        }
    };

    render() {
        return (
            <Pressable style={{flex:1, maxWidth:67, maxHeight:67}} onPress={() => this.signInAsync()}>
                <Image source={g_branding} resizeMode={"contain"}
                       style={{flex: 1, width: undefined, height: undefined}}/>
            </Pressable>
        )
    }
}
