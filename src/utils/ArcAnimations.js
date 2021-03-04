import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import {View, Text, Animated} from 'react-native';
import PropTypes from 'prop-types';
const propTypes = {
    animationIn: PropTypes.oneOf(["fadeIn", "heartBeat" , "shakeHor", "shakeVert",
        "fadeInLeft", "fadeInRight", "fadeInTop", "fadeInBottom"]).isRequired,
    animationOut: PropTypes.oneOf(["fadeOut", "fadeOutLeft", "fadeOutRight",
        "fadeOutTop", "fadeOutBottom"]).isRequired,
    visible: PropTypes.bool.isRequired,
    playOnMount: PropTypes.bool,
    timeIn: PropTypes.number,
    timeOut: PropTypes.number,
    time: PropTypes.number,
    oomph: PropTypes.number
}

const ArcAnimation = forwardRef((props, ref) => {
    const {animationIn, animationOut, timeIn,
        timeOut, time, playOnMount, visible, oomph,
        fadeInDelay, fadeOutDelay, children} = props || {};

    const fade = useRef(new Animated.Value(0)).current;
    const x = useRef(new Animated.Value(0)).current;
    const y = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const [hasPlayedOnMount, setHasPlayedOnMount] = useState(null);

    useImperativeHandle(ref, () => ({
         play() {
          handleAnimations()
         }
    }));

    useEffect(() => {
        if (hasPlayedOnMount === null)
            playOnMountLogic()
        else
            handleAnimations();
        return (() => {
            Animated.timing(fade).stop()
            Animated.timing(x).stop()
            Animated.timing(y).stop()
            Animated.spring(x).stop()
            Animated.spring(y).stop()
        })
    }, [visible])

    const playOnMountLogic = () => {
        if (playOnMount !== undefined) {
            if (playOnMount) {
                handleAnimations()
            }
        }
        setHasPlayedOnMount(true)
    }



    const handleAnimations = () => {
        if (visible) {
            setTimeout(() => {
                controllerIn()
            }, fadeInDelay ?? 0)

        }
        else {
            setTimeout(() => {
                controllerOut()
            }, fadeOutDelay ?? 0)
        }
    }

    const controllerIn = () => {
        switch (animationIn) {
            case "fadeIn":
                fadeIn();
                break;
            case "fadeInLeft":
                fadeLeft(true);
                break;
            case "fadeInRight":
                fadeRight(true);
                break;
            case "fadeInTop":
                fadeTop(true);
                break;
            case "fadeInBottom":
                fadeBottom(true)
                break;
            case "shakeHor":
                shakeHor()
                break;
            case "shakeVert":
                shakeVert();
                break;
            case "heartBeat":
                heartBeat()
                break;

        }
    }

    const controllerOut = () => {
        switch (animationOut) {
            case "fadeOut":
                fadeOut();
                break;
            case "fadeOutLeft":
                fadeLeft(false);
                break;
            case "fadeOutRight":
                fadeRight(false);
                break;
            case "fadeOutTop":
                fadeTop(false);
                break;
            case "fadeOutBottom":
                fadeBottom(false)
                break;
        }
    }

    const heartBeat = () => {
        scale.setValue(0.6);
        x.setValue(0);
        y.setValue(0)
        fade.setValue(1)
        const playTime = timeIn ?? time ?? 5000
        Animated.sequence([
            Animated.spring(scale, {
                toValue: 0.8,
                friction: 25,
                velocity: oomph ?? 20,
                duration: playTime/4,
                useNativeDriver: true
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 25,
                delay:20,
                velocity: oomph ?? 20,
                duration: playTime/4,
                useNativeDriver: true
            }),
            Animated.spring(scale, {
                toValue: 1.2,
                friction: 25,
                delay:300,
                velocity: oomph ?? 20,
                duration: playTime/4,
                useNativeDriver: true
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 25,
                delay:20,
                velocity: oomph ?? 20,
                duration: playTime/4,
                useNativeDriver: true
            }),

        ]).start()
    }

    const shakeHor = async () => {
        x.setValue(15);
        y.setValue(0)
        fade.setValue(1)
        const playTime = timeIn ?? time ?? 5000

        Animated.spring(x, {
            toValue: 0,
            friction: 1,
            velocity: oomph ?? 100,
            duration: playTime,
            useNativeDriver: true
        }).start();
    }

    const shakeVert = async () => {
        x.setValue(0);
        y.setValue(15)
        fade.setValue(1)
        const playTime = timeIn ?? time ?? 5000

        Animated.spring(y, {
            toValue: 0,
            friction: 1,
            velocity: oomph ?? 100,
            duration: playTime,
            useNativeDriver: true
        }).start();
    }

    const fadeLeft = (dir) => {
        if (dir) {
            fadeIn()
            x.setValue(-250);
            Animated.timing(x, {
                toValue: 0,
                duration: timeIn ?? time ?? 5000,
                useNativeDriver: true
            }).start();
        }
        else {
            fadeOut()
            x.setValue(0);
            Animated.timing(x, {
                toValue: -250,
                duration: timeIn ?? time ?? 5000,
                useNativeDriver: true
            }).start();
        }
    }

    const fadeRight = (dir) => {
        if (dir) {
            fadeIn()
            x.setValue(250);
            y.setValue(0)
            Animated.timing(x, {
                toValue: 0,
                duration: timeIn ?? time ?? 5000,
                useNativeDriver: true
            }).start();
        }
        else {
            fadeOut()
            x.setValue(0);
            y.setValue(0)
            Animated.timing(x, {
                toValue: 250,
                duration: timeIn ?? time ?? 5000,
                useNativeDriver: true
            }).start();
        }
    }

    const fadeTop = (dir) => {
        if (dir) {
            fadeIn()
            y.setValue(-250);
            x.setValue(0)
            Animated.timing(y, {
                toValue: 0,
                duration: timeIn ?? time ?? 5000,
                useNativeDriver: true
            }).start();
        }
        else {
            fadeOut()
            y.setValue(0);
            x.setValue(0)
            Animated.timing(y, {
                toValue: -250,
                duration: timeIn ?? time ?? 5000,
                useNativeDriver: true
            }).start();
        }
    }

    const fadeBottom = (dir) => {
        if (dir) {
            fadeIn()
            y.setValue(250);
            x.setValue(0)
            Animated.timing(y, {
                toValue: 0,
                duration: timeIn ?? time ?? 5000,
                useNativeDriver: true
            }).start();
        }
        else {
            fadeOut()
            y.setValue(0);
            x.setValue(0)
            Animated.timing(y, {
                toValue: 250,
                duration: timeIn ?? time ?? 5000,
                useNativeDriver: true
            }).start();
        }
    }

    const fadeIn = () => {
        fade.setValue(0);
        Animated.timing(fade, {
            toValue: 1,
            duration: timeIn ?? time ?? 5000,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        fade.setValue(1);
        Animated.timing(fade, {
            toValue: 0,
            duration: timeOut ?? time ?? 5000,
            useNativeDriver: true
        }).start();
    };


    return (
        <Animated.View style={{opacity: fade, transform: [{translateX: x}, {translateY: y}, {scale: scale}]}}>
            {children}
        </Animated.View>
    )
})

ArcAnimation.propTypes = propTypes;
export default ArcAnimation
