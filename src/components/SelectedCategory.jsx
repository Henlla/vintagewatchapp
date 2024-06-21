import React, { useEffect, useState } from 'react'
import categoryApi from '../api/category/categoryAPI'

const SelectedCategory = (props) => {
  const [categories, setCatgories] = useState([])

  const getCategory = async () => {
    var response = await categoryApi.getCategory();
    if (response.isSuccess) {
      setCatgories(response.data);
    }
  }
  useEffect(() => {
    getCategory()
  }, [])

  return (
    <select onChange={props.handleChange}>
      <option value="all">All Categories</option>
      {
        categories && categories.map((item) => (
          <option key={item.categoryId} value={item.categoryId}>{item.categoryName}</option>
        ))
      }
    </select>
  )
}

export default SelectedCategory