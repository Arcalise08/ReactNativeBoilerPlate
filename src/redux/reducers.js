import * as Types from './constants';
import { combineReducers } from 'redux';

function _user(state = null, action) {
    switch (action.type) {
        case Types.SET_USER:
            return action.value;
        default:
            return state;
    }
}

function _nav(state = null, action) {
    switch (action.type) {
        case Types.SET_NAV:
            return action.value;
        default:
            return state;
    }
}

function _dimBackground(state = false, action) {
    switch (action.type) {
        case Types.SET_DIM_BACKGROUND:
            return true;
        case Types.DISMISS_DIM_BACKGROUND:
            return false;
        default:
            return state;
    }
}

function _actionSheet(state = false, action) {
    switch (action.type) {
        case Types.SHOW_ACTION_SHEET:
            return true;
        case Types.DISMISS_ACTION_SHEET:
            return false;
        default:
            return state;
    }
}

const store = combineReducers({
    _user,
    _nav,
    _dimBackground,
    _actionSheet
})

export default store;
