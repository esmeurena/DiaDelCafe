import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../redux/store";
import { deleteMenuItemThunk, getAllMenuItemsThunk } from "../../redux/menu_item";
import './OrderOnlinePage.css';
import { useNavigate } from "react-router-dom";

function OrderOnlinePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    return (
        <div className="menu-container-outer">
            <div className="title-create">
                    <h1 className="order-online-title">Order Online</h1>

                    {
                        (() => {
                            if (sessionUser) {
                                return <div className="menu-item-create">
                                    <NavLink className="menu-item-create" to="/createMenuItem">CREATE NEW MENU ITEM</NavLink>
                                </div>
                            }
                        })()
                    }
                </div>
            <div className="menu-container">
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
                                menuItemsDisplay.push(
                                    <div className="menu-item" key={indiv_item.id}>
                                        <div className="menu-item-header">
                                            <h2 className="menu-item-title">{indiv_item.name}</h2>
                                        </div>

                                        <div className="menu-item-body">
                                            <div className="menu-item-description">
                                                <p>{indiv_item.description}</p>
                                            </div>
                                            <div className="menu-item-image-sec">
                                                <img className="menu-item-image" src={indiv_item.url} alt={indiv_item.name} />
                                            </div>
                                        </div>

                                        <div className="menu-item-footer">
                                            <p className="menu-item-price">${indiv_item.price}</p>
                                            <div className="menu-item-actions">
                                                <NavLink to={`/menu_items/${indiv_item.id}/update`} className="update-button">Update</NavLink>
                                                <button onClick={(e) => deleteMenuItem(e, indiv_item.id!)} className="delete-button">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return menuItemsDisplay;
                        }
                    })()
                }
            </div>
        </div>
    );


}

export default OrderOnlinePage;
