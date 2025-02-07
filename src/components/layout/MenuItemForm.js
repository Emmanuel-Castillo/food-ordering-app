import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import DeleteButton from "../DeleteButton";

export default function MenuItemForm({ onSubmit, menuItem, onDelete }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");

  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || "");
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);

        // If creating a new menu item, chances are the first category (Pizza) will be selected
        // Therefore, the user will not select that option since it's set to pizza, however, the state category
        // would still be ""
        // As a contingency, set default category for new menu item to the first element in categories once fetched
        if (!menuItem || !menuItem?.category) {
          setCategory(categories[0])
        }
      });
    });
  }, []);

  return (
    <form
      className="mt-8 max-w-2xl mx-auto"
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
    >
      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories.length > 0 &&
              categories.map((c) => <option value={c._id}>{c.name}</option>)}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            props={sizes}
            setProps={setSizes}
            name={"Sizes"}
            addLabel={"Add item size"}
          />
          <MenuItemPriceProps
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
            name={"Extra ingredients"}
            addLabel={"Add ingredient prices"}
          />
          <button type="submit">Save</button>
          {onDelete && (
            <div className="grow mt-2">
                <DeleteButton
                  label={"Delete this menu item"}
                  onDelete={onDelete}
                />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
