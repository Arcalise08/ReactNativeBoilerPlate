import React from 'react';
import {Image, Pressable} from 'react-native';
import * as Facebook from 'expo-facebook';
import f_branding from '../../../assets/OAuth/f_logo.png'

export default class FacebookSignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
        }
    }

    async loginWithFacebook() {
        try {
            await Facebook.initializeAsync({
                appId: '180420410430481',
                appName:"Keepsakes"
            });
        }
        catch(e) {
            console.log("Error initializing facebook")
            console.log(e)
        }
        let signIn = null;
        try {
            signIn = await Facebook.logInWithReadPermissionsAsync(
                { permissions: ['public_profile', 'email'] }
            );
        }
        catch(e) {
            console.log("Error logging in to facebook")
            console.log(e)
        }
        if (signIn) {
            if (signIn.type === 'success') {
                await this.props.signIn(signIn.token);
            }
        }

    }

    render() {
        return (
            <Pressable style={{flex:1,maxWidth:50, maxHeight:50}} onPress={() => this.loginWithFacebook()}>
                <Image source={f_branding} resizeMode={"contain"} style={{flex: 1,  width: undefined, height: undefined}}/>
            </Pressable>
        )
    }

}
