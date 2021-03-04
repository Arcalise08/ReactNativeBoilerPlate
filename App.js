import React, {useEffect, useState, useRef} from 'react'
import {View, LogBox} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from 'expo-font';
import {Provider} from "react-redux";
import ArcProvider from "./src/components/ArcProvider";
import Routes from "./src/routes";
import Constants from "expo-constants";
import app_store from "./src/redux/store";

const customFonts = {
    'Asap-Bold': require('./assets/Fonts/Asap-Bold.ttf'),
    'Asap-Bold-Italic': require('./assets/Fonts/Asap-BoldItalic.ttf'),
    'Asap-Italic': require('./assets/Fonts/Asap-Italic.ttf'),
    'Asap-Medium': require('./assets/Fonts/Asap-Medium.ttf'),
    'Asap-Medium-Italic': require('./assets/Fonts/Asap-MediumItalic.ttf'),
    'Asap-Regular': require('./assets/Fonts/Asap-Regular.ttf'),
    'Asap-Semi-Bold': require('./assets/Fonts/Asap-SemiBold.ttf'),
    'Asap-Semi-Bold-Italic': require('./assets/Fonts/Asap-SemiBoldItalic.ttf'),
    'Quicksand-Bold': require("./assets/Fonts/Quicksand-Bold.ttf"),
    'Quicksand-Regular': require("./assets/Fonts/Quicksand-Regular.ttf"),
    'Quicksand-Light': require("./assets/Fonts/Quicksand-Light.ttf"),
    'Quicksand-Medium': require("./assets/Fonts/Quicksand-Medium.ttf"),
    'Quicksand-SemiBold': require("./assets/Fonts/Quicksand-SemiBold.ttf"),
    'Roboto_medium': require("./assets/Fonts/Roboto-Medium.ttf")
};
LogBox.ignoreLogs(["Setting a timer for a long period of time", "expo-google-sign-in", "componentWillMount has been renamed", "componentWillReceiveProps has been renamed"])

function App() {
    const [fontsLoading, setFontsLoading] = useState(true)

    useEffect(() => {
        _loadFontsAsync()
        return () => {

        };
    }, []);

    const _loadFontsAsync = async () =>  {
        await Font.loadAsync(customFonts);
        setFontsLoading(false)
    }

  return (
        <Provider store={app_store}>
            <ArcProvider>
                {
                    fontsLoading ?
                        <AppLoading/>
                        :
                        <Routes/>
                }
            </ArcProvider>
        </Provider>
  );
}
export default App;
