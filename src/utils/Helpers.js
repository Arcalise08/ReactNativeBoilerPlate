import AsyncStorage from "@react-native-community/async-storage";


//Takes a time in seconds and returns it as a formatted time(in minutes and seconds).
//useful for tick counters.
export const returnTime = (time) => {
    if (time) {
        if (time < 60)
            if (time < 10)
                return "0:0" + Math.floor(time);
            else
                return "0:" + Math.floor(time);
        else {
            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time - (minutes * 60))
            if (seconds < 10)
                return minutes + ":" + "0" + seconds
            else {
                return minutes + ":" + seconds
            }
        }
    }
    else {
        return 'N/A'
    }
}
//My take on auto formatting phone numbers with dashes. this function
//should only be used on the value portion of a text input field. do NOT
//directly mutate a phone number with this function.

//ex <TextInput onChange={(e) => setValue(e)} value={formatPhoneNumber(value)} />
export const formatPhoneNumber = (phone) => {
    const number = phone.replace(/-/g, "")

    if (!number) {
        if (!number?.length) return;

        console.log("malformed phone number supplied to helper function")
        console.trace();
        return;
    }

    if (typeof number !== "string") {
        console.log(`Type match error. Type of ${typeof number} supplied to helper function. only string is supported by this function.`)
        console.trace();
        return;
    }

    if (number.length > 6) {
        const slice1 = number.slice(0, 3)
        const slice2 = number.slice(3, 6);
        const slice3 = number.slice(6, number?.length + 1)
        return `${slice1}-${slice2}-${slice3}`
    }
    if (number.length > 3) {

        const slice1 = number.slice(0,3);
        const slice2 = number.slice(3, number.length + 1)
        return `${slice1}-${slice2}`
    }
    else {
        return number
    }


}

//Easy to use async local storage function
//Automagically stringifys and parses jsons
//Implemention meant to mimic browser localStorage
export async function _localStorage(type, key, value) {
    switch (type) {
        case "set":
            try {
                const jsonValue = JSON.stringify(value)
                await AsyncStorage.setItem(key, jsonValue)
                return true;
            } catch (e) {
                return false;
            }

        case "get":
            try {
                const jsonValue = await AsyncStorage.getItem(key)
                return jsonValue != null ? JSON.parse(jsonValue) : null;
            } catch (e) {
                return false
            }
        case "clear":
            try {
                AsyncStorage.clear()
                return true;
            } catch {
                return false
            }
    }
}
//Converts items to blob format and returns a promise that will hopefully resolve
//to a blob.
export const convertToBlob = async (uri) => {
    const promise = new Promise(async (resolve, reject) => {
        if (!uri) {
            reject("No image URL provided to convert")
        }

        try {
            const file = {
                uri,
                name: `img_${(new Date().toUTCString())}.jpg`,
                type: 'image/jpg',
            };

            const body = new FormData();
            body.append('uploadedFile', file);
            if (body)
                resolve(body)
            else
                reject("Error converting object to blob")
        }
        catch (e) {
            console.log(e)
            reject("An error has occurred")
        }

    })
    return promise
}
