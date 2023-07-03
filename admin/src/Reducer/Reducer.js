import { createReducer } from "@reduxjs/toolkit";

import {
	getUser,
	fetchUser,
	removeUser,
} from "./Action";

export default createReducer([], {
	[getUser]: (state, action) => {
		return state
	},
	[fetchUser]: (state, action) => {
		return action.payload
	},
	[removeUser]: (state, action) =>{
		return state = {}
	}
});
