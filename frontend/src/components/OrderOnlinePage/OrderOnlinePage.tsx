import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../redux/store";
import { createMenuItemThunk, deleteMenuItemThunk, getAllMenuItemsThunk, updateMenuItemThunk } from "../../redux/menu_item";
// import { useNavigate } from "react-router-dom";
import './OrderOnlinePage.css';
import { useNavigate } from "react-router-dom";

function OrderOnlinePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const navigate = useNavigate();
    const sessionUser = useAppSelector((state) => state.session.user);
    const menuItems = useSelector((state: RootState) => state.menu_items.allMenuItems);
    useEffect(() => {
        dispatch(getAllMenuItemsThunk());
    }, [dispatch]);

    const deleteMenuItem = async (e: React.MouseEvent<HTMLButtonElement>, menuItemId: number) => {
        e.preventDefault();
        await dispatch(deleteMenuItemThunk(menuItemId));

        navigate("/order")
    };

    // const updateMenuItem = async (e: React.MouseEvent<HTMLButtonElement>, menuItemId: number) => {
    //     e.preventDefault();
    //     await dispatch(updateMenuItemThunk(menuItemId));

    //     navigate("/order")
    // };

    return (
        <div className="menu-container">
            <h1>Order Online</h1>
            <div className="menu-item-create">
                <NavLink to="/createMenuItem">Create new menu item</NavLink>
            </div>

            {
                (() => {
                    if (!sessionUser) {
                        return <h2>Log in to order online!</h2>;
                    }
                    else if (menuItems.length === 0) {
                        return <p>No Menu items</p>;
                    } else {
                        const menuItemsDisplay = [];
                        let total = 0;

                        for (let i = 0; i < menuItems.length; i++) {
                            const indiv_item = menuItems[i];

                            // let price = Number(indiv_item.product?.price) || 0;
                            // let itemTotal = Number(price * indiv_item.item_count);
                            // total += itemTotal;

                            menuItemsDisplay.push(

                                <div className="menu-item" key={indiv_item.id} >

                                    <div className="menu-second">
                                        {/* <img className="menu-item-image" src={indiv_item.menu_item[0]?.url} /> */}

                                        <div className="menu-item-name-top">
                                            <h3 className="menu-item-name">{indiv_item.name} </h3>
                                            {/* <p>★{indiv_item.product?.avg_rating}</p> */}
                                            {/* <p>Free shipping when you spend $7.55 more</p>
                                            <label> Size:
                                                <select className="shopping-size-select"> <option>S</option> <option>M</option> <option>L</option> </select>
                                            </label> */}
                                        </div>

                                        {/* <div className="fix-price">
                                                <div>${price.toFixed(2)}</div>
                                        </div> */}
                                    </div>
                                    <div className="menu-item-update">
                                        <NavLink to={`/menu_items/${Number(indiv_item.id)}/update`}
                                            className='update-menu-item-button'>
                                            Update Item
                                        </NavLink>
                                        {/* <button onClick={(e) => updateMenuItem(e, Number(indiv_item.id))} className="update-menu-item-button">
                                            Update Menu Item
                                        </button> */}
                                    </div>
                                    <div className="menu-item-delete">

                                        <button onClick={(e) => deleteMenuItem(e, Number(indiv_item.id))} className="delete-menu-item-button">
                                            Delete Item
                                        </button>
                                    </div>

                                    <hr className="spacing-line" />
                                    <p className="order-tax-message">Taxes and other fees: $1.04 (Ready within 20-30 mins)</p>
                                </div>
                            );
                        }
                        // menuItemsDisplay.push(
                        //     <div className="order-total" key="total-price">
                        //         Total Price: ${total.toFixed(2)}
                        //     </div>
                        // );

                        return menuItemsDisplay;
                    }
                })()
            }
        </div>
    );


}

export default OrderOnlinePage;
