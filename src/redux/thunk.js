import {setUser} from "./actions";
import {Alert} from "react-native";
import {convertToBlob} from "../utils/Helpers";

export const _showActionSheet = () => async dispatch => {
    console.log("ACTION SHEET NOT IMPLEMENTED")
}

/**
 * App api related calls will be below
 */
export const _initializeApp = () => async dispatch => {
    try {
        //Useful for initializing websockets
    }
    catch (e) {
        console.log("//Couldn't initialize app// more information is likely logged below")
        console.log(e)
    }
}

export const _silentLogin = () => async dispatch => {
    await dispatch(_initializeApp())
    console.log("_silent login not implemented")
}

export const _signUp = ({email, password}) => async dispatch => {
    try {
        if (!email || !password) {
            console.log("Error creating account. check sign up objects below")
            console.log(`email: ${email}, password:${password}`)
            return false;
        }
        await dispatch(_initializeApp());
        console.log("_signUp not implemented")
        return false
    }
    catch (e) {
        const errorMsg = e?.message
        Alert.alert("Error creating account", errorMsg)
        return false;
    }

}

export const _emailLogin = ({email, password}) => async dispatch => {
    await dispatch(_initializeApp());
    try {
        console.log("email sign in not implemented")
        return false;
    }
    catch (e) {
        const errorMsg = e?.message
        Alert.alert("Error signing in", errorMsg)
        return false;
    }
}


export const _fbSignIn = (token) => async dispatch => {
    try {
        await dispatch(_initializeApp());
        console.log("fbSignIn not implemented")
        return false;
    }
    catch (e) {
        console.log("Error logging into facebook// additional logging should be below")
        console.log(e)
        return false
    }

}

export const _gSignIn =  (token) => async dispatch => {
    try {
        console.log("_gSignIn not implemented")
        return false;
    }
    catch (e) {
        console.log("Error logging into google// additional logging should be below")
        console.log(e)
        return false
    }

}

export const _appleSignIn = (token, nonce) => async dispatch => {
    try {
        console.log("_appleSignIn not implemented")
        return false;
    }
    catch (e) {
        console.log("Error logging into apple// additional logging should be below")
        console.log(e)
        return false
    }
}
