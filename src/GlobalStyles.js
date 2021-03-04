import React, {useState} from 'react';
import {StyleSheet, Image} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const TERMS_AND_CONDITIONS_LINK = "";
export const PRIVACY_POLICY_LINK = "";

export const MAIN_FONT = "Quicksand";
export const SECONDARY_FONT = "";

//Changes made to global styles affect the entire app.
//this should(Hopefully) make simple style changes easier to accomplish
/**
 * Screen priorities, Higher number === higher priority;
 */
//These values directly control what screens will overlay each other
//ex: Toast screen pops while Action sheet is open. Since Toast priority is
//lower than Action sheet. Action sheet will remain active view.
//main provider MUST be the lowest priority but higher then 1!
export const MAIN_PROVIDER_PRIORITY = 2;
export const TOAST_PRIORITY = 3;
export const ACTION_SHEET_PRIORITY = 4;
//Action sheet directly opens search sheet. As such its priority must be higher
//than action sheet.


/**
 * Animation Timings
 */
//Action sheet component features a sleek animation. These value control how fast fading happens!
export const FADE_IN_ACTION_SHEET = 550;
export const FADE_OUT_ACTION_SHEET = 350;

export const FADE_IN_SEARCH_SHEET = 550;
export const FADE_OUT_SEARCH_SHEET = 350;

//Universal dim background values
export const DIM_BACKGROUND_IN = 150;
export const DIM_BACKGROUND_OUT = 150;


export const Colors = {
    //Main color of the app background
    //This is a global variable and may be overwritten in some screens!
    appBackground: "white",
    //------------------------------------------------------------------
    borderColors: {
        light: "#dbdbdb",
        gray:"gray",
        dark: "black"
    },
    dimBackground: "rgba(60, 56, 56, 0.62)",
    modal: {
        backgroundColor:"white"
    },
    //Generic Colors used
    white: {
        lightest:"#ffffff",
        light:"#F8F8F8",
        medium:"#F7F7F7",
        dark:"#F6F6F6",
        darkest:"#F2F2F2"
    },
    gray: {
        lightest:"#ebebeb",
        light: "#e0e0e0",
        medium: "#d1d1d1",
        dark: "#b3b3b3",
        darkest: "#8c8c8c"
    },
    black: {
        lightest:"#4F4F4F",
        light: "#464646",
        medium: "#363636",
        dark: "#2C2C2C",
        darkest: "#1D1D1D"
    },
    purple: {
        dark: "#10069F"
    }
}

//Image placeholders for app. Good to note webp is the best format
//But not all IOS devices support it.
export const ImagePlaceholders = {
    profile: undefined ,
    item: undefined,
    IOSprofile: undefined,
    IOSitem: undefined
}



//Icons are special. Use the Object as a wrapper like so
// <Icons.SearchIcon/> then overwrite any settings you'd like.
export const Icons = {
    SearchIcon: (props) => (<Image {...props} source={require("../assets/images/icons/search.png")}/>),
    CancelSearchIcon: (props) => (<Image {...props} source={require("../assets/images/icons/cancel_icon.png")} />),
    BackIcon: (props) => (<Ionicons {...props} name="chevron-back" />),
    BlankRatingStar: (props) => (<MaterialIcons {...props} name="star-border"/>),
    FullRatingStar: (props) => (<MaterialIcons {...props} name="star-rate" />),
    PlusIcon: (props) => (<AntDesign {...props} name="plus"/>)
}

export const TextStyles = {
    mainFont: StyleSheet.create({
        xs: {
            fontFamily: `${MAIN_FONT}-Regular`,
            fontSize:RFPercentage(2),
        },
        sm: {
            fontFamily: `${MAIN_FONT}-Regular`,
            fontSize:RFPercentage(2),
        },
        md: {
            fontFamily: `${MAIN_FONT}-Regular`,
            fontSize:RFPercentage(2.5),
        },
        lg: {
            fontFamily: `${MAIN_FONT}-Regular`,
            fontSize:RFPercentage(3),
        },
        xl: {
            fontFamily: `${MAIN_FONT}-Regular`,
            fontSize:RFPercentage(3.5)
        },
        header: {
            fontFamily: `${MAIN_FONT}-Regular`,
            fontSize:RFPercentage(3.5),
        },
        bold: {
            fontFamily: `${MAIN_FONT}-Bold`
        }
    }),
    secondary: StyleSheet.create({
        xs: {
            fontFamily: `${SECONDARY_FONT}-Regular`,
            fontSize:RFPercentage(2),
        },
        sm: {
            fontFamily: `${SECONDARY_FONT}-Regular`,
            fontSize:RFPercentage(2),
        },
        md: {
            fontFamily: `${SECONDARY_FONT}-Regular`,
            fontSize:RFPercentage(2.5),
        },
        lg: {
            fontFamily: `${SECONDARY_FONT}-Regular`,
            fontSize:RFPercentage(3),
        },
        xl: {
            fontFamily: `${SECONDARY_FONT}-Regular`,
            fontSize:RFPercentage(3.5)
        },
        header: {
            fontFamily: `${SECONDARY_FONT}-Regular`,
            fontSize:RFPercentage(3.5),
        },
    })
}
