import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, RootState } from "../../redux/store";
import { updateMenuItemThunk } from "../../redux/menu_item";
import './UpdateMenuItemPage.css';
import { IMenuItem } from "../../redux/types/menu_item";

interface IUpdateErrors {
    server?: any;
    name?: string;
    description?: string;
    price?: string;
    url?: string;
}

function UpdateMenuItemPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useAppSelector((state) => state.session.user);
    const { id } = useParams<{ id: string }>();
    const menuItem = useSelector((state: RootState) => state.menu_items.byId[Number(id)]) as IMenuItem;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState<IUpdateErrors>({
        server: "",
        name: "",
        description: "",
        price: "",
        url: ""
    });

    useEffect(() => {
        if (menuItem) {
            setName(menuItem.name);
            setDescription(menuItem.description);
            setPrice(menuItem.price);
            setUrl(menuItem.url);
        }
    }, [menuItem]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("INSIDE HANDLE SUBMIT,, ");

        const serverResponse = await dispatch(
            updateMenuItemThunk(Number(id),{
                name,
                description,
                price,
                url
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            navigate("/order");
        }
    };

    return (
        <>
            <h1>Update Menu item</h1>
            {errors.server && <p>{errors.server}</p>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {errors.name && <p>{errors.name}</p>}
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.price && <p>{errors.price}</p>}
                <label>
                    Image url
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </label>
                {errors.url && <p>{errors.url}</p>}

                <button type="submit">Update Item</button>
            </form>
        </>
    );
}

export default UpdateMenuItemPage;
