import React, {useState, useEffect, useRef} from 'react';
import {Pressable, View,Text, ScrollView, TouchableHighlight} from "react-native";
import CustomizedModal from "./Modal";
import PropTypes from "prop-types";
import {TextStyles} from "../GlobalStyles";

const {mainFont} = TextStyles;

//This is a simple reusable Picker component. It uses the Modal component to show picker options which
//is necessary as the native Picker component is very limited//e.g does not have placeholder values//
//customization doesnt carry over between IOS and Android. This component solves these issues

const propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired
}
export const ArcPicker = ({value, onChange, placeholder, textStyle, textColor, containerStyle, options}) => {
    const [pickerVisible, setPickerVisible] = useState(false)
    const pickerRef = useRef();



    useEffect(() => {
        return () => {

        };
    }, []);

    const togglePicker = () => {
        setPickerVisible(!pickerVisible)
    }

    const setValue = (label, value) => {
        onChange(value)
        setPickerVisible(false)
    }

    const customPicker = () => {
        return (
            <ScrollView style={{}}>
                {
                    options.map((item, index) => <ListItem key={index} value={item.value} setValue={setValue} label={item.label}/>)
                }
            </ScrollView>
        )
    }

    return (
        <Pressable onPress={() => togglePicker()} style={{...containerStyle}}>
           <CustomizedModal
                closeOnPress
                visible={pickerVisible}
                animationType={"none"}
                customButtons={<View></View>}
                modalRadius={0}
                customTitle={customPicker()}
                onClose={togglePicker}
                animation={true}
                animationObj={{
                    value: 0,
                    type: "slide",
                    toValue: 1500,
                    duration: 1000,
                    friction: 1000
                }}

           />
            <Text
                style={[mainFont.md,{
                    color: placeholder ?
                        "gray" : textColor ?
                            textColor : "black",
                    ...textStyle}]}>

                {value?.label?.length ? value.label : placeholder }
            </Text>
        </Pressable>
    )
}
ArcPicker.propTypes = propTypes;

const ListItem = ({label, value, setValue}) => (
    <TouchableHighlight onPress={() => setValue(label, value)}>
        <Text style={{marginVertical:10, padding:5, textAlign:"center"}}>{label}</Text>
    </TouchableHighlight>
)
