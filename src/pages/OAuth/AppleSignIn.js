import React from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';

function AppleSignIn(props) {
    return (
        <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={{ width: 200, height: 44 }}
            onPress={async () => {
                try {
                    const csrf = Math.random().toString(36).substring(2, 15);
                    const nonce = Math.random().toString(36).substring(2, 10);
                    const hashedNonce = await Crypto.digestStringAsync(
                        Crypto.CryptoDigestAlgorithm.SHA256, nonce);
                    const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                        state: csrf,
                        nonce: hashedNonce
                    });
                    const { identityToken, email, state} = credential;
                    props.signIn(identityToken, nonce)

                } catch (e) {
                    if (e.code === 'ERR_CANCELED') {
                        // handle that the user canceled the sign-in flow
                    } else {
                        // handle other errors
                    }
                }
            }}
        />
    );
}
export default AppleSignIn;