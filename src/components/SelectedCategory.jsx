import React, { useEffect, useState } from 'react'
import categoryApi from '../api/category/categoryAPI'

const SelectedCategory = ({ handleChange }) => {
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
    <select onChange={(e) => handleChange(e.target.value)}>
      <option value={0}>All Categories</option>
      {
        categories && categories.map((item) => (
          <option key={item.categoryId} value={item.categoryId}>{item.categoryName}</option>
        ))
      }
    </select>
  )
}

export default SelectedCategory