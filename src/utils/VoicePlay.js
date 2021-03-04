import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import * as Permissions from 'expo-permissions';
import { Audio } from "expo-av";

export default function VoicePlay(props) {
    const [sound, setSound] = React.useState(undefined);

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            {uri: props.sound}
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync(); }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync(); }
            : undefined;
    }, [sound]);

    return (
        <Entypo
            name="controller-play"
            onPress={() => playSound()}
            size={wp("7%")}
            color={sound ?  "green" : "black"} />
    )
}
