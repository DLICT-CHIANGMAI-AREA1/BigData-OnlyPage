import { createAction } from '@reduxjs/toolkit';

export const getUser = createAction('GET_USER');
export const fetchUser = createAction('FETCH_USER');
export const removeUser = createAction('REMOVE_USER');
