import React, {useState, useEffect, Fragment} from "react";
import {Image, View, ActivityIndicator, Platform} from "react-native";
import {ImagePlaceholders, Colors} from "../GlobalStyles";
import PropTypes from 'prop-types';


const propTypes = {
    type: PropTypes.oneOf(["profile", "item", "none"]).isRequired,
}
//Great Image component with the ability to check if images are URIs update accordingly
//it also features automatic loading of placeholders in the event of loading errors.

//set placeholder images in GlobalStyles.js
const ArcImage = ({type, source, containerStyle,children, ...props}) => {
    const [image, setImage] = useState(isURL(source) ? {uri: source} : source)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setImage(null)
        setLoading(true);
        if (!source) {
            error();
            return;
        }
        const img = isURL(source) ? {uri: source} : source
        setImage(img)
    }, [source])

    const error = () => {

        switch (type) {
            case "profile":
                if (Platform.OS === "ios")
                    setImage(ImagePlaceholders.IOSprofile);
                else
                    setImage(ImagePlaceholders.profile);
                break;
            case "item":
                if (Platform.OS === "ios")
                    setImage(ImagePlaceholders.IOSitem);
                else
                    setImage(ImagePlaceholders.item);
                break;
            case "none":
                setImage(null);
                break;
        }
        setLoading(false);
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", ...containerStyle}}>
            {
                loading &&
                <ActivityIndicator style={{position: "absolute", top: 0, right: 0, left: 0, bottom: 0}}
                                   color={Colors.purple.dark} size={32}/>
            }
            <Image
                {...props}
                onError={error}
                onLoadEnd={() => setLoading(false)}
                source={image}
            />

            {children}
        </View>

    )

}
ArcImage.propTypes = propTypes;

const isURL = (url) => {
    try {
        new URL(url)
        return true;
    }
    catch {
        return false;
    }
}

export default GrpvynImage;
