import React, { useEffect, useState } from "react";
import Ratting from "../components/Ratting";
import { Link } from "react-router-dom";
import productAPI from "../api/product/productAPI";

const title = "Our Products";

const ProductData = [
  {
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/vintagetimepece.appspot.com/o/fixedPage%2F1-1637153121296-1712574057.png?alt=media&token=dfb293b5-74e7-4faa-8ce1-a591db5e5dfe",
    cate: "Men's Watch",
    title: "Casio Edifice EFR-526L-1AVUDF",
    author: "assets/images/course/author/01.jpg",
    brand: "Nike",
    price: "$199.00",
    id: 1,
  },
  {
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/vintagetimepece.appspot.com/o/fixedPage%2Fbl2333-10ltdi-2-1712670902.png?alt=media&token=200825f3-5d69-44bf-bfa9-66a6e514dd16",
    cate: "Men's Watch",
    title: "Casio Edifice EFR-526L-7AVUDF",
    author: "assets/images/course/author/02.jpg",
    brand: "D&J Bags",
    price: "$199.00",
    id: 2,
  },
  {
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/vintagetimepece.appspot.com/o/fixedPage%2Fbl2333-10mtci-3-1712670883.png?alt=media&token=bc368891-a2ec-49cc-b0a5-b0f96a4e98e8",
    cate: "Women's Watch",
    title: "Casio Edifice EFV-550L-1AVUDF",
    author: "src/assets/images/categoryTab/brand/apple.png",
    brand: "Apple",
    price: "$199.00",
    id: 3,
  },
  {
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/vintagetimepece.appspot.com/o/fixedPage%2Fc032-1722505568-1736774066-1712661283.png?alt=media&token=e8f00af0-85d3-4e5f-9b1c-0d374ce054f7",
    cate: "Men's Watch",
    title: "Casio Edifice EFR-526D-7AVUDF",
    author: "assets/images/course/author/04.jpg",
    brand: "Gucci",
    price: "$199.00",
    id: 4,
  },
  {
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/vintagetimepece.appspot.com/o/fixedPage%2Fdk-1-12531-4-2-1650504996108-1712581905.png?alt=media&token=edaf68fc-556a-4966-8ae1-28f0eafd7be8",
    cate: "Sport Watch",
    title: "Casio G-Shock GA-2000S-1ADR",
    author: "assets/images/course/author/05.jpg",
    brand: "Nike",
    price: "$199.00",
    id: 5,
  },
  {
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/vintagetimepece.appspot.com/o/fixedPage%2Ffb1443-08a-2-1647594969517-1712572343.png?alt=media&token=279443ad-0954-48ab-a938-b3a230860938",
    cate: "Smart Watch",
    title: "Casio G-Shock GA-2100-1ADR",
    author: "assets/images/course/author/06.jpg",
    brand: "Zaara",
    price: "$199.00",
    id: 6,
  },
  {
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/vintagetimepece.appspot.com/o/fixedPage%2Ffc-718n4nh6b-1-1639301979336-1712488772.png?alt=media&token=507df637-3eed-4d32-96ff-ba44289522c7",
    cate: "Women's Watch",
    title: "Look Less Chanel Bag ",
    author: "assets/images/course/author/01.jpg",
    brand: "Gucci",
    price: "$199.00",
    id: 7,
  },
  {
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/vintagetimepece.appspot.com/o/fixedPage%2Ffc-718nwm4h6-5-1644840619132-1712576555.png?alt=media&token=64489499-6e38-4f8c-9bd1-59d3394b0ea4",
    cate: "Men's Watch",
    title: "Casio G-Shock GA-110-1ADR",
    author: "assets/images/course/author/02.jpg",
    brand: "Bata",
    price: "$199.00",
    id: 8,
  },
];
const CategoryShowCase = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  //category baded filtering 
  const filterItem = (categItem) => {
    const updateItems = data.filter((curElem) => {
      return curElem.category?.some(item => item.category.categoryName == categItem)
    });
    setItems(updateItems)
  }

  const fetchData = async () => {
    var response = await productAPI.getProduct();
    if (response.isSuccess) {
      setItems(response.data);
      setData(response.data);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="course-section style-3 padding-tb">
      {/* shapes */}
      <div className="course-shape one">
        <img
          src="https://raw.githubusercontent.com/mdalmamunit427/advanced-reactjs-ecommerce-website-starter-files/main/src/assets/images/shape-img/icon/01.png"
          alt=""
        />
      </div>
      <div className="course-shape two">
        <img
          src="https://raw.githubusercontent.com/mdalmamunit427/advanced-reactjs-ecommerce-website-starter-files/main/src/assets/images/shape-img/icon/02.png"
          alt=""
        />
      </div>

      {/* main section*/}
      <div className="container">
        {/*section header*/}
        <div className="section-header">
          <h2 className="title">{title}</h2>
          <div className="course-filter-group">
            <ul className="lab-ul">
              <li onClick={() => setItems(data)}>All</li>
              <li onClick={() => filterItem("Men's Watch")}>Men's Watch</li>
              <li onClick={() => filterItem("Women's Watch")}>Women's Watch</li>
              <li onClick={() => filterItem("Sport Watch")}>Sport Watch</li>
              <li onClick={() => filterItem("Smart Watch")}>Smart Watch</li>
            </ul>
          </div>
        </div>

        {/*section body*/}
        <div className="section-wrapper ">
          <div className="row g-4 justify-content-center row-cols-x1-4 row-cols-lg-3 row-cols-md-2 row-cols-1
          course-filter">
            {
              items && items.slice(0, 9).map((product) =>
                <div key={product.timepiece.timepieceId} className="col">
                  <div className="course-item style-4">
                    <div className="course-inner">
                      <div className="course-thubm">
                        <img src={product.mainImage?.imageUrl} alt="" />
                        <div className="course-category">
                          <div className="course-cate">
                            <Link href="#">{product.cate}</Link>
                          </div>
                          <div className="course-review">
                            <Ratting />
                          </div>
                        </div>
                      </div>

                      {/* content*/}
                      <div className="course-content">
                        <Link to={`/shop/${product.timepiece.timepieceId}`}><h6>{product.timepiece.timepieceName}</h6></Link>
                        <div className="course-footer">
                          <div className="course-author">


                            <Link to="/" className="ca-name">{product.timepiece.brand.brandName}</Link>
                          </div>
                          <div className="course-price">
                            {product.timepiece.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryShowCase;
