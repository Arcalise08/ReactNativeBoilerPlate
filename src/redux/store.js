import { createStore, applyMiddleware, compose } from 'redux';
import {_localStorage} from "../utils/Helpers";
// middlewares
import thunkMiddleware from 'redux-thunk'

// Import custom components
import store from "./reducers";

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        _localStorage("set",'state', serializedState)
    }catch(e){

    }
}

async function loadFromLocalStorage() {
    try {
        const serializedState = await _localStorage("get",'state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }catch (e) {
        console.log(e)
        return undefined
    }
}

/**
 * Create a Redux store that holds the app state.
 */

const app_store = createStore(store, applyMiddleware(thunkMiddleware),);
const unsubscribe = app_store.subscribe(() => {
    const state = app_store.getState();
    saveToLocalStorage(state);
});

export default app_store;
