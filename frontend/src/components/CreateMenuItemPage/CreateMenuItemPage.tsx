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
  <div className="create-menu-container">
    <h1>Create New Menu Item</h1>
    {errors.server && <p className="red-error-message">{errors.server}</p>}
    <form className="create-menu-form" onSubmit={(e) => handleSubmit(e)}>
      <label className= "create-menu-label">
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      {errors.name && <p className="red-error-message">{errors.name[0]}</p>}

      <label className= "create-menu-label">
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      {errors.description && <p className="red-error-message">{errors.description[0]}</p>}

      <label className= "create-menu-label">
        Price
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </label>
      {errors.price && <p className="red-error-message">{errors.price[0]}</p>}

      <label className= "create-menu-label">
        Image URL
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
      {errors.url && <p className="red-error-message">{errors.url[0]}</p>}

      <button className= "create-menu-button" type="submit">CREATE MENU ITEM</button>
    </form>
  </div>
);

}

export default CreateMenuItemPage;
