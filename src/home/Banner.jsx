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
const bannerList = [
  {
    iconName: "icofont-users-alt-4",
    text: "1.5 Million Customers",
  },
  {
    iconName: "icofont-notification",
    text: "More then 2000 Marchent",
  },
  {
    iconName: "icofont-globe",
    text: "Buy Anything Online",
  },
];
const Banner = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("all");

  // search functionality
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm)
    // fitlering products based on search
    const filtered = productData.filter((product) =>
      product.timepiece.timepieceName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        selectedItem != "all" ? product.category?.some(ca => ca.categoryId == selectedItem) : product.timepiece.timepieceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProduct(filtered);
  }

  const getProduct = async () => {
    var response = await productAPI.getProduct();
    if (response.isSuccess) {
      setProductData(response.data)
    }
  }

  const onChangeCategory = (e) => {
    setSelectedItem(e.target.value)
    const filtered = productData.filter((product) =>
      product.timepiece.timepieceName.toLowerCase().includes(searchInput.toLowerCase()) &&
        e.target.value != "all" ? product.category?.some(ca => ca.categoryId == e.target.value) : product.timepiece.timepieceName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProduct(filtered);
  }

  useEffect(() => {
    getProduct()
  }, [])

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
            value={searchInput}
            onChange={handleSearch}
          />
          <button type="submit"><i className="icofont-search"></i></button>
        </form>
        <p>{desc}</p>
        <ul className="lab-ul">
          {
            searchInput && filteredProduct.map((product, i) => <li key={i}>
              <Link to={`/shop/ ${product.timepiece.timepieceId}`}>{product.timepiece.timepieceName}</Link>
            </li>)
          }
        </ul>
      </div>
    </div>
  </div>

};

export default Banner;
