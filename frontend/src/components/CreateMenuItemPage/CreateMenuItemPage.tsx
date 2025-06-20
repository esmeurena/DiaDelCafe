import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { createMenuItemThunk } from "../../redux/menu_item";
import './CreateMenuItemPage.css';

interface IMenuItemErrors {
  server?: any;
  name?: string;
  description?: string;
  price?: string;
  url?: string;
}

function CreateMenuItemPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const sessionUser = useAppSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState<IMenuItemErrors>({
    server: "",
    name: "",
    description: "",
    price: "",
    url: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("INSIDE HANDLE SUBMIT,, ");

    const serverResponse = await dispatch(
      createMenuItemThunk({
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
      <h1>Create new Menu Item</h1>
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
        
        <button type="submit">Create Item</button>
      </form>
    </>
  );
}

export default CreateMenuItemPage;
