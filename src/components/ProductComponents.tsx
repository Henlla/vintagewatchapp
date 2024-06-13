import { useEffect, useState } from "react";
import PaginateComponents from "./PaginateComponents";
import productAPI from "../api/productAPI";


const ProductComponents = () => {
  const [currentPage, setCurentPage] = useState<any>(1);
  const [arrayOfCurPage, setArrayOfCurPage] = useState<any>();
  const [products, setProducts] = useState<any>();
  const [productPerPage, setProductPerPage] = useState<any>();
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [tokenString, setTokenString] = useState<any>();
  const [recordPerPage] = useState(8);
  const [nPage, setNPage] = useState(1);

  const numbers = [...Array(nPage && (nPage + 1)).keys()].slice(1)
  const token = localStorage.getItem("access_token")

  const getProductData = async () => {
    let response;
    let totalPage;
    if (isAuthenticate) {
      var data = {
        token: tokenString
      }
      response = await productAPI.getProductExceptUser(data)
    } else {
      response = await productAPI.getAllProduct()
    }
    if (response.isSuccess) {
      totalPage = response.data && Math.ceil(response.data.length / recordPerPage)
      setProducts(response.data)
      setNPage(totalPage)
    }
  };

  const getProductDataWithPaging = async () => {
    let response;
    if (!isAuthenticate) {
      var data = {
        pageNumber: currentPage,
        _pageSize: recordPerPage
      }
      response = await productAPI.getAllProductWithPaging(data)
    } else {
      var tokenData = {
        token: tokenString
      }
      var pageData = {
        pageNumber: currentPage,
        _pageSize: recordPerPage
      }
      response = await productAPI.getAllProductExceptUserWithPaging(tokenData, pageData)
    }

    if (response.isSuccess) {
      setProductPerPage(response.data)
    }
  }

  const updatePaginate = () => {
    let tempNumberOfPage: (number | string)[] = [...numbers];
    if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfPage = [1, 2, 3, 4, '...', numbers.length]
    }
    else if (currentPage === 4) {
      const slice = numbers.slice(0, 5)
      tempNumberOfPage = [...slice, '...', numbers.length]
    }
    else if (currentPage >= 4 && currentPage < (numbers.length - 2)) {
      const sliced1 = numbers.slice(currentPage - 2, currentPage);
      const sliced2 = numbers.slice(currentPage, currentPage + 1)
      tempNumberOfPage = ([1, '...', ...sliced1, ...sliced2, '...', numbers.length])
    }
    else if (currentPage > numbers.length - 3) {
      const sliced = numbers.slice(numbers.length - 4)
      tempNumberOfPage = ([1, '...', ...sliced])
    } else {
      return;
    }
    setArrayOfCurPage(tempNumberOfPage)
  }

  const handleTestAuthenticate = async () => {
    var data = {
      token: token
    }
    var response = await productAPI.postTimepiece(data)
    console.log(response)
  }


  useEffect(() => {
    setTokenString(token)
  }, [tokenString])

  useEffect(() => {
    setIsAuthenticate(!!tokenString);
  }, [tokenString])

  useEffect(() => {
    getProductData();
  }, [nPage, isAuthenticate])


  useEffect(() => {
    getProductDataWithPaging();
    updatePaginate();
  }, [currentPage, nPage])


  const prePage = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setCurentPage(currentPage - 1)
  }


  const nextPage = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setCurentPage(currentPage + 1)
  }


  const changePage = (item: any) => {
    if (item == "...")
      return;
    setCurentPage(item)
  }

  return (
    <>
      <button onClick={handleTestAuthenticate}>Check authenticate</button>
      <div className="font-sans p-4= mx-auto lg:max-w-6xl md:max-w-4xl">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-16">Top Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">

          {productPerPage && productPerPage.map((_item: any, index: any) => (
            <div key={index} className="bg-white overflow-hidden cursor-pointer">
              <div className="w-full h-[150px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                <img src={_item.mainImage && _item.mainImage.imageUrl} alt={_item.mainImage && _item.mainImage.imageName}
                  className="h-full w-full object-contain" />
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-gray-800">{_item.timepiece.timepieceName}</h3>
                <h4 className="text-lg text-blue-600 font-bold mt-3">${_item.timepiece.price}</h4>
              </div>

              <div className="flex justify-center space-x-1 mt-3">
                <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>

            </div>
          ))}
        </div>
      </div>
      <PaginateComponents numbersPage={numbers} arrayOfCurPage={arrayOfCurPage} prePage={prePage} nextPage={nextPage} changePage={changePage} currentPage={currentPage} />
    </>
  );
};

export default ProductComponents;
