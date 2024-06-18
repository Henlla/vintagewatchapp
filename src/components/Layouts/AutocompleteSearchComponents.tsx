import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import productAPI from "../../api/productAPI";

const AutoCompleteSearchComponents = () => {
  const [tokenString] = useState<any>(localStorage.getItem("access_token"));
  const [products, setProducts] = useState<any>([]);

  const getProductData = async () => {
    let response;
    if (tokenString) {
      var data = {
        token: tokenString
      }
      response = await productAPI.getProductExceptUser(data)
    } else {
      response = await productAPI.getAllProduct()
    }
    if (response.isSuccess) {
      setProducts(response.data)
    }
  };

  useEffect(() => {
    getProductData()
  }, [])

  const onChangeRedirect = (value: any) => {
    window.location.href ="product?id=" + value
  }


  return (
    <Autocomplete
      className="xl:w-96 max-lg:w-full lg:ml-10 max-md:mt-4 max-lg:ml-4 bg-gray-100 focus:bg-transparent px-6 rounded h-11 outline-[#333] text-sm transition-all"
      id="free-solo-2-demo"
      freeSolo
      disableClearable
      options={products}
      getOptionLabel={(option: any) => option.timepiece.timepieceName}
      onChange={(event, value) => { onChangeRedirect(value.timepiece.timepieceId) }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          size="small"
          margin="none"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
}

export default AutoCompleteSearchComponents;