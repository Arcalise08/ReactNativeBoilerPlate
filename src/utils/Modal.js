import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Modal, SafeAreaView, Animated, ScrollView, TouchableHighlight, StyleSheet, Pressable} from 'react-native';
import PropTypes from 'prop-types';

CustomizedModal.propTypes = {
    customTitle: PropTypes.element,
    customButtons: PropTypes.element,
    modalRadius: PropTypes.number,
    scrollViewStyle: PropTypes.object,
    backgroundColor: PropTypes.string,
    buttonText: PropTypes.string,
    closeOnPress: PropTypes.bool,
    title: PropTypes.string,
    textStyles: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    customBack: PropTypes.func,
    onClose: PropTypes.func,
    animationType: PropTypes.string,
    animation: PropTypes.bool,
    animationObj: PropTypes.shape({
        value: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        toValue: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        friction: PropTypes.number.isRequired
    })
}

export default function CustomizedModal(props) {
    const modalSpring = useRef(new Animated.Value(1)).current;
    const modalSlide = useRef(new Animated.Value(0)).current;

    /**
     * @To-Do
     * Revisit ViewCounter and implement real fix for animations firing on mount
     */
    const [viewCounter, setViewCounter] = useState(0);

    const [modalVisible, setModalVisible] = useState(props.visible ? props.visible : false)


    //Instructions for animation usage.
    //This function sets a reference to itself in the props on mount. To use animation you must set an instance of the ref in its parent container.
    //You could also just edit this component directly and call the animation from within the component.

    //An example of this in a function component would look like this..
    //const modalRef = null; //do not use useState as it seems to not want to store the reference

    //create quick function to set modalRef
    //const setReference = (reference) => modalRef = reference

    // in the return..
    //<CustomModal animation={(reference) => setReference(reference)} animationObj={{type:"spring", currentValue: 1, toValue: 1.5, duration: 5000, friction: 1}}/>

    //You can then trigger the animation by assigning its ref like so
    //if (modalRef) {
    //    modalRef.current.play()
    //}

    //You can also swap out the animationObj in the props at anytime to switch up the animations.

    const myRef = useRef({})


    useEffect(() => {
        if (props.visible) {
            setModalVisible(true)
            if (props.animation) {
                animation(true)
            }
        }
        else {
            //This is kind of a hacky fix. But we dont want the modal to animate on mount even if user has animation set.
            //this viewCounter increments on mount and as long as its above 0 the animation will play as required.
            if (props.animation && viewCounter !== 0) {
                animation(false)
                setTimeout(() => {
                    setModalVisible(false)
                }, props.animationObj.duration / 2)
            }
        }
        setViewCounter(viewCounter + 1)
        return () => {

        };
    },[props.visible])


    const animation = (dir) => {
        if (props.animationObj) {
            switch (props.animationObj.type) {
                case "spring" :
                    Spring()
                    break;
                case "slide":
                    Slide(dir);
                    break;

            }
        }

        else {
            throw new Error("No animation object was assigned for the animation triggered. \n \n" + ">props.animationObj< within CustomModal Component" + "\n \n" )
        }
    }

    const Slide = (dir) => {
        modalSlide.setValue(dir ? props.animationObj.toValue : 0)
        Animated.spring(
            modalSlide,
            {
                toValue: dir ? 0 : props.animationObj.toValue,
                duration: props.animationObj.duration,
                friction: props.animationObj.friction,
                useNativeDriver: true,
            }
        ).start()
    }


    const Spring = () => {
        modalSpring.setValue(props.animationObj.value)
        Animated.spring(
            modalSpring,
            {
                toValue: props.animationObj.toValue,
                duration: props.animationObj.duration,
                friction: props.animationObj.friction,
                useNativeDriver: true,
            }
        ).start()
    };


    return (
        <SafeAreaView>
            <Modal
                animationType={"none"}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    props.onClose ? props.onClose() : null
                }}
            >
                <Pressable style={styles(props).centeredView} onPress={() => props.closeOnPress ? props?.onClose() : null} >
                    <Animated.ScrollView
                        centerContent={true}
                        style={[{transform: [{scale:modalSpring}, {translateY: modalSlide}]}, props.scrollViewStyle ? props.scrollViewStyle : null] }
                        contentContainerStyle={[styles(props).modalView, props.modalStyle && props.modalStyle]}>

                        <View style={{flex:1,marginHorizontal:20, alignItems:"center", justifyContent:"center"}}>
                            <ScrollView
                                style={styles(props).modalContainer}
                                centerContent={props.centerContent ? props.centerContent : true}
                                contentContainerStyle={[ styles(props).contentContainerStyle, props.contentContainerStyle]}>
                                {props.customTitle ?
                                    props.customTitle
                                    :
                                    <Text style={props.titleStyles ? props.titleStyles : styles(props).modalText}>
                                        {props.title ? props.title : "Hello There!"}
                                    </Text>
                                }



                                {props.customButtons ? props.customButtons :
                                    <TouchableHighlight
                                        style={{...styles().openButton, backgroundColor: "#2196F3"}}
                                        onPress={() => props.onClose ? props.onClose() : null}
                                    >
                                        <Text style={styles().textStyle}>{props.buttonText ? props.buttonText : "Close"}</Text>
                                    </TouchableHighlight>
                                }

                            </ScrollView>
                        </View>
                    </Animated.ScrollView>
                </Pressable>
            </Modal>
        </SafeAreaView>
    )
}


const styles = (props) => StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor:"backgroundColor:rgba(47, 53, 55, 0.95)"
    },
    modalView: {
        flex:1,

    },
    modalContainer: {
        backgroundColor: "white",
        flexGrow:0,
        borderRadius: props?.modalRadius !== null || props?.modalRadius !== undefined ? props.modalRadius : 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    contentContainerStyle: {
        padding:20
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
