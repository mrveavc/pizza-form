import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import options from "../options.json";
import { MultiSelect } from "react-multi-select-component";
import InputMask from "react-input-mask";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dough, setDough] = useState("");
  const [toppings, setToppings] = useState([]);
  const [extra, setExtra] = useState("");
  const [doughOptions, setDoughOptions] = useState([]);
  const [toppingOptions, setToppingOptions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDoughOptions(options.doughOptions);
    setToppingOptions(options.toppingOptions);
  }, []);

  const handleSave = async () => {
    if (!name || !phone || !dough) {
      alert("Lütfen zorunlu alanları doldurun.");
      return;
    }

    const newProduct = {
      name,
      phone,
      dough,
      toppings,
      extra,
    };

    try {
      await addDoc(collection(db, "products"), newProduct);
      alert("Pizza başarıyla eklendi!");
      setName("");
      setPhone("");
      setDough("");
      setToppings([]);
      setExtra("");
      navigate("/");
    } catch (err) {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="add-product-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h1>Pizza Oluştur</h1>
      <input
        type="text"
        placeholder="Pizza İsmi"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <InputMask
        mask="(999) 999-9999"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      >
        {(inputProps) => (
          <input
            {...inputProps}
            type="tel"
            required
            placeholder="Telefon Numarası"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
          />
        )}
      </InputMask>
      <select value={dough} onChange={(e) => setDough(e.target.value)} required>
        <option value="">Select Dough</option>
        {doughOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <MultiSelect
        options={toppingOptions}
        value={toppings}
        onChange={setToppings}
        labelledBy="Select Toppings"
      />
      <input
        type="text"
        placeholder="Ekstra Malzemeler"
        value={extra}
        onChange={(e) => setExtra(e.target.value)}
      />
      <button onClick={handleSave} className="add-product-button">
        {" "}
        Add Product
      </button>
      <Link to={`/`} type="submit">
        İptal
      </Link>
    </div>
  );
};

export default AddProduct;
