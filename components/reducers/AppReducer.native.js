import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state,action) => {
    switch(action.type) {
        case 'CHANGE_DATA':
            return{
                weather: [action.payload, state.weather],
                fail: [action.payload, state.fail]
            }
        default:
            return state;
    }
}