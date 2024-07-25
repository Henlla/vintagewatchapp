import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SelectedCategory from "../components/SelectedCategory";
import productAPI from "../api/product/productAPI";

const title = (
  <h2>
    Search Your One From <span>Thounsand</span> of Watchs
  </h2>
);
const desc = "We have the lagest collection of Watchs";

const Banner = () => {
  const [searchInput, setSearchInput] = useState("");
  const [productData, setProductData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);


  const getProduct = async () => {
    var response = await productAPI.getProductByNameAndCategory(searchInput, selectedItem);
    setProductData(response.data);
  }

  const onChangeCategory = (value) => {
    setSelectedItem(value);
  }

  useEffect(() => {
    if (searchInput) {
      getProduct()
    } else {
      setProductData([]);
    }
  }, [selectedItem, searchInput]);

  return <div className="banner-section style-4">
    <div className="container">
      <div className="banner-content">
        {title}
        <form>
          <SelectedCategory handleChange={onChangeCategory} />
          <input
            type="text"
            name="search "
            id="search"
            placeholder="Search your product"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit"><i className="icofont-search"></i></button>
        </form>
        <p>{desc}</p>
        <ul className="lab-ul">
          {
            productData.map((product, i) => <li key={i}>
              <Link to={`/shop/ ${product.timepiece.timepieceId}`}>{product.timepiece.timepieceName}</Link>
            </li>)
          }
        </ul>
      </div>
    </div>
  </div>

};

export default Banner;
