import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { useActionSheet } from "@expo/react-native-action-sheet";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

function CustomActionSheet(props) {
    let { showActionSheetWithOptions } = useActionSheet();

    let _onOpenActionSheet = () => {
        let options = ['Take Photo', 'Select Photo', 'Cancel'];
        let destructiveButtonIndex = 2;
        let cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
                useModal:true,
            },
            buttonIndex => {
                if (buttonIndex === 0)
                    takeImage();
                if (buttonIndex === 1)
                    getImage();
            },
        );
    }

    const takeImage = async () => {
        let status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let  status2 = await Permissions.askAsync(Permissions.CAMERA);
        if(status.granted && status2.granted) {
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                mediaTypes: ImagePicker.MediaTypeOptions.Images
            })
            if (!result.cancelled) {
                props.setImage(result.uri)
            }
        }
    }

    const getImage = async () => {
        const status = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status.granted) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',
                allowsEditing: true,
                aspect: [1, 1],
            }).catch(error => console.log(error));

            if (!result.cancelled) {
                props.setImage(result.uri)
            }

        }

    }

    if (props?.customWrapper) {
        return (
            <TouchableOpacity style={{flex:1}} onPress={_onOpenActionSheet}>
                {props.customWrapper}
            </TouchableOpacity>
        );
    }


    if (props?.image?.length)
        return (
            <Pressable onPress={_onOpenActionSheet}>
                <Image source={{uri: props.image}}  style={{width: wp("70%"), height:wp("70%")}} />
            </Pressable>

        )

    return (
        <View style={{borderWidth: props.noborder? 0:1, backgroundColor:"#666666", width: wp("70%"), height: wp("70%"), alignItems:"center" , justifyContent:"center" }}>
            <MaterialCommunityIcons onPress={_onOpenActionSheet} name="camera-plus" size={wp("30%")} color="white" />
        </View>
    )
}

let ConnectedApp = connectActionSheet(CustomActionSheet)
export default ConnectedApp;
