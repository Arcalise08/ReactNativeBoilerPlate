import React, {useState, useEffect} from 'react';
import { Entypo } from '@expo/vector-icons';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import { Audio } from "expo-av";

export default function VoiceCapture(props) {

    const [recording, setRecording] = React.useState();

    async function startRecording() {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);

        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        props.setVoice(uri)
    }

    return (
        <Entypo
            name="mic"
            onPress={() => recording ?  stopRecording() : startRecording()}
            size={wp("7%")}
            color={recording ?  "green" : "black"} />
    )
}
