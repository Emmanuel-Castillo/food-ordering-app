import { useState } from "react";

export default function UserForm({user}) {
    
    const [userName, setUserName] = useState("");
      const [image, setImage] = useState("");
      const [phone, setPhone] = useState("");
      const [streetAddress, setStreetAddress] = useState("");
      const [city, setCity] = useState("");
      const [postalCode, setPostalCode] = useState("");
      const [country, setCountry] = useState("");
    return(
        <div className="flex gap-4">
                  <div>
                    <div className=" p-2 rounded-lg relative max-w-[120px]">
                      <EditableImage link={image} setLink={setImage}/>
                    </div>
                  </div>
                  <form className="grow" onSubmit={handleProfileInfoUpdate}>
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
                      value={session.data.user.email}
                      disabled={true}
                    />
                    <label>Phone number</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(ev) => setPhone(ev.target.value)}
                    />
                    <label>Street Address</label>
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={streetAddress}
                      onChange={(ev) => setStreetAddress(ev.target.value)}
                    />
        
                    <div className="flex gap-2">
                      <div>
                        <label>Postal code</label>
                        <input
                          type="text"
                          placeholder="Postal Code"
                          value={postalCode}
                          onChange={(ev) => setPostalCode(ev.target.value)}
                        />
                      </div>
                      <div>
                        <label>City</label>
                        <input
                          type="text"
                          placeholder="City"
                          value={city}
                          onChange={(ev) => setCity(ev.target.value)}
                        />
                      </div>
                    </div>
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(ev) => setCountry(ev.target.value)}
                    />
                    <button type="submit">Save</button>
                  </form>
                </div>
    )
}