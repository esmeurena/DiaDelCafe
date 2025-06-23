/****************************
↓↓↓↓↓↓↓↓↓↓ IMPORTS ↓↓↓↓↓↓↓↓↓↓
 ***************************/

import { IActionCreator } from "./types/redux";
import { ICredentials, ISignUpUser, IUser, SessionInitialState } from "./types/session";

/*********************************
↓↓↓↓↓↓↓↓↓↓ ACTION TYPES ↓↓↓↓↓↓↓↓↓↓
 ********************************/

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const DELETE_USER = 'session/deleteUser'

/************************************
↓↓↓↓↓↓↓↓↓↓ ACTION CREATORS ↓↓↓↓↓↓↓↓↓↓
 ***********************************/

const setUser = (user: IUser) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const deleteUser = () => ({
  type: DELETE_USER
});

/***************************
↓↓↓↓↓↓↓↓↓↓ THUNKS ↓↓↓↓↓↓↓↓↓↓
 **************************/

export const thunkAuthenticate = (): any => async (dispatch: any) => {
  try {

    const response = await fetch("/api/auth/");
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        throw response;
      }
      dispatch(setUser(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return (await err.json());
  }

};

export const thunkLogin = (credentials: ICredentials): any => async (dispatch: any) => {
  try {

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return response;
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    const errorMessages = await err.json();
    return errorMessages;
  }

};

export const thunkSignup = (user: ISignUpUser): any => async (dispatch: any) => {
  try {

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return (await err.json())
  }
};

export const thunkLogout = (): any => async (dispatch: any) => {
  try {
    await fetch("/api/auth/logout");
    dispatch(removeUser());
  } catch {
    return { server: "Something went wrong. Please try again" }
  }
};

export const deleteUserThunk = (): any => async (dispatch: any) => {
  try {

    const res = await fetch(`/api/users`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(removeUser());
    } else {
      throw res;
    }
  } catch (e) {
    const err = e as Response;
    return await err.json();
  }
};

export const updateUserThunk = (userId: number, newUser: IUser): any => async (dispatch: any) => {
  try {
    const formData = new FormData();
    formData.append("first_name", newUser.first_name);
    formData.append("last_name", newUser.last_name);
    formData.append("email", newUser.email);
    formData.append("birth_day", newUser.birth_day.toString());
    formData.append("birth_month", newUser.birth_month.toString());
    formData.append("birth_year", newUser.birth_year.toString());
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(newUser)
      body: formData
    });

    if (response.ok) {
      // const data = await response.json();
      const data: IUser = await response.json();
      dispatch(setUser(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return (await err.json())
  }
};

/**********************************
↓↓↓↓↓↓↓↓↓↓ INITIAL STATE ↓↓↓↓↓↓↓↓↓↓
 *********************************/

const initialState: SessionInitialState = { user: null };

/****************************
↓↓↓↓↓↓↓↓↓↓ REDUCER ↓↓↓↓↓↓↓↓↓↓
 ***************************/

function sessionReducer(state = initialState, action: IActionCreator): SessionInitialState {
  let newState = {
    ...state
  };

  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case DELETE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
