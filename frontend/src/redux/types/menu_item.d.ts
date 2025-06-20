export interface IMenuItem {
    id?: number;
    name: string;
    description: string;
    price: number;
    url: string;
    // menu_item_images: IMenuItemImage[];
    // menu_item_reviews?: IMenuItemReview[];
    // created_at?: string;
    // updated_at?: string;
}

// export interface IDeleteMenuItem {
//     id: number;
// }

// export interface IMenuItemImage {
//     id?: number;
//     product_id?: number;
//     url: string;
//     preview: boolean;
//     created_at?: string;
//     updated_at?: string;
// }

export interface IMenuItemState {
    byId: {
        [id: number]: IMenuItem;
    };
    allMenuItems: IMenuItem[];
}

export interface IActionCreator {
    type: string;
    payload: any;
}
