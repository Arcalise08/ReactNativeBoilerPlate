import * as Types from './constants'

export const setUser = (value) => ({
    type: Types.SET_USER, value
})

export const setNav = (value) => ({
    type: Types.SET_NAV, value
})

export const showDimBackground = () => ({
    type: Types.SET_DIM_BACKGROUND
})

export const dismissDimBackground = () => ({
    type: Types.DISMISS_DIM_BACKGROUND
})

export const showActionSheet = () => ({
    type: Types.SHOW_ACTION_SHEET
})

export const dismissActionSheet = () => ({
    type: Types.DISMISS_ACTION_SHEET
})


