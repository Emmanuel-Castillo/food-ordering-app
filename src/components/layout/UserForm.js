"use client";
import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [city, setCity] = useState(user?.city || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);

  function handleAddressChange(propName, value) {
    if (propName === 'city') setCity(value)
    if (propName === 'phone') setPhone(value)
    if (propName === 'streetAddress') setStreetAddress(value)
    if (propName === 'postalCode') setPostalCode(value)
    if (propName === 'country') setCountry(value)

  }

  const { data: loggedInUserData } = useProfile();
  return (
    <div className="flex gap-4">
      <div>
        <div className=" p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
            admin,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={user?.email}
          disabled={true}
        />
        <AddressInputs
          addressProps={{
            phone,
            streetAddress,
            postalCode,
            city,
            country,
          }}
          setAddressProps={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex gap-2 items-center mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                value={user?.admin}
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
