# React Native Boilerplate 

#### This is meant to be a simple boilerplate for react native

I made this mostly for myself so that I can stop rewriting the same code for every project. But anyone is free to use it. It comes with the following integrations, They will need further setup to become functional(This is intentional as I dont want to opinionate a backend for you)

If you don't understand the following integrations this is likely not the best boilerplate for you.

* Redux
* Redux-Thunk
* React-Navigation
* Google Sign In
* Facebook Sign In
* Apple Sign In
* Email Sign In


## Important!
### ```THIS IS AN EXPO-MANAGED PROJECT```
And no, this will not likely change in the future.

##
It also includes my library of react native utilities. Most of them aren't super well documented but they're meant to be relatively simple. Within them you'll find the following additional features

* **ArcAnimations** - A simple animation wrapper using Animated API (Blazing fast compared to others)
* **ActionSheet** - Its a very simple Action Sheet for the common occurrence of needing users to select an Image or take an image from their phones
* **ArcPicker** - A picker component meant to unify the look of an app across IOS and Android
* **CustomGoBack** - Just a simple go back handler. Meant to be used in conjunction with ActionSheet so that ActionSheet can close when users press back. This component is injected into every screen by default (A feature not found in most ActionSheets)
* **Helpers** A helper script with a ton of useful functions to save time
* **Modal** Custom Modal that supports animations - This one hasnt been updated in sometime. use at your own risk
* **VoiceCapture** Component for capturing voice
* **VoicePlay** Component for playing audio/voice

Feel free to use any or all of my utilities but please don't submit bug reports on them. They are not NPM packages.. And are not meant to be completely reusable. This entire project is a starting point for someone building a react native app. You have to inspect, understand, and build off them to take full advantage.
