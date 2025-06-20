/****************************
↓↓↓↓↓↓↓↓↓↓ IMPORTS ↓↓↓↓↓↓↓↓↓↓
 ***************************/

import { IMenuItem, IMenuItemState, IActionCreator } from './types/menu_item';

/*********************************
↓↓↓↓↓↓↓↓↓↓ ACTION TYPES ↓↓↓↓↓↓↓↓↓↓
 ********************************/

const CREATE_MENU_ITEM = 'menu_items/createMenuItem';
const GET_ALL_MENU_ITEMS = 'menu_items/getAllMenuItems';
const GET_MENU_ITEM = 'menu_items/getMenuItem';
const UPDATE_MENU_ITEM = 'menu_items/updateMenuItem';
const DELETE_MENU_ITEM = 'menu_items/deleteMenuItem';

/************************************
↓↓↓↓↓↓↓↓↓↓ ACTION CREATORS ↓↓↓↓↓↓↓↓↓↓
 ***********************************/

const createMenuItem = (menuItem: IMenuItem) => ({
  type: CREATE_MENU_ITEM,
  payload: menuItem
});

const getAllMenuItems = (menuItems: IMenuItem[]) => ({
  type: GET_ALL_MENU_ITEMS,
  payload: menuItems
})

const getMenuItem = (menuItem: IMenuItem) => ({
  type: GET_MENU_ITEM,
  payload: menuItem
})

const updateMenuItem = (menuItem: IMenuItem) => ({
  type: UPDATE_MENU_ITEM,
  payload: menuItem
})

const deleteMenuItem = (menuItemId: number) => ({
  type: DELETE_MENU_ITEM,
  payload: menuItemId
});

/***************************
↓↓↓↓↓↓↓↓↓↓ THUNKS ↓↓↓↓↓↓↓↓↓↓
 **************************/

export const createMenuItemThunk = (menuItem: IMenuItem): any => async (dispatch: any) => {
  try {
    console.log("MENU ITEM, ", menuItem);
    const response = await fetch("/api/menu_items/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menuItem)
    });

    if (response.ok) {
    const data = await response.json();
      dispatch(createMenuItem(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return (await err.json())
  }
};

export const getAllMenuItemsThunk = (): any => async (dispatch: any) => {
  try {
    const res = await fetch('/api/menu_items');
    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        throw res;
      }
      dispatch(getAllMenuItems(data))
      return data.menu_items;
    } else {
      throw res;
    }
  } catch (e) {
    const err = e as Response;
    return (await err.json());
  }
}

export const getMenuitemThunk = (menuItemId: number): any => async (dispatch: any) => {
  try {
    const res = await fetch(`/api/menu_items/${menuItemId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getMenuItem(data));
      return data;


    } else {
      throw res;
    }
  } catch (error) {

    return error;
  }
};

export const updateMenuItemThunk = (menuItemId: number, menu_item: IMenuItem): any => async (dispatch: any) => {
  try {

    const response = await fetch(`/api/menu_items/${menuItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu_item)
    });

    if (response.ok) {
      // const data = await response.json();
      const data: IMenuItem = await response.json();
      dispatch(updateMenuItem(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return (await err.json())
  }
};

export const deleteMenuItemThunk = (menuItemId: number): any => async (dispatch: any) => {
  try {
    const res = await fetch(`/api/menu_items/${menuItemId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteMenuItem(menuItemId));
    } else {
      throw res;
    }
  } catch (e) {
    const err = e as Response;
    return await err.json();
  }
};

/**********************************
↓↓↓↓↓↓↓↓↓↓ INITIAL STATE ↓↓↓↓↓↓↓↓↓↓
 *********************************/

const initialState: IMenuItemState = {
  byId: {},
  allMenuItems: []
};

/****************************
↓↓↓↓↓↓↓↓↓↓ REDUCER ↓↓↓↓↓↓↓↓↓↓
 ***************************/

function menuItemsReducer(state = initialState, action: IActionCreator) {

  let newState;
  switch (action.type) {

    case CREATE_MENU_ITEM:
      newState = { ...state };
      newState.allMenuItems = [...newState.allMenuItems, action.payload];
      newState.byId = { ...newState.byId, [action.payload.id]: action.payload };

      return newState;

    case GET_ALL_MENU_ITEMS:
      const menu_items_all = action.payload.menu_items;
      newState = { ...state }
      newState.allMenuItems = menu_items_all;
      
      let newId: { [id: number]: IMenuItem } = {};
      for (let menu_item of menu_items_all) {
        newId[menu_item.id] = menu_item;
      }
      newState.byId = newId;
      newState.allMenuItems = menu_items_all;
      return newState;

    case GET_MENU_ITEM:
      newState = { ...state };
      newState.allMenuItems = [action.payload];

      newState.byId[action.payload.id] = action.payload;
      return newState;

    case UPDATE_MENU_ITEM:
      newState = { ...state };
      newState.allMenuItems = [...newState.allMenuItems, action.payload];
      newState.byId = { ...newState.byId, [action.payload.id]: action.payload };

      return newState;

    case DELETE_MENU_ITEM:
      newState = { ...state };
      newState.allMenuItems = state.allMenuItems.filter((menu_item) => menu_item.id !== action.payload);
      newState.byId = { ...state.byId };
      delete newState.byId[action.payload];
      return newState;


    default:
      return state;
  }
}




export default menuItemsReducer;
