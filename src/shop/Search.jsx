import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import productAPI from '../api/product/productAPI';
import { Box } from '@mui/material';

var delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [searchBoxHeight, setSearchBoxHeight] = useState("");

    useEffect(() => {
        getProductByFilter();
    }, [searchTerm]);

    const getProductByFilter = async () => {
        var params = {
            name: searchTerm
        };
        var response = await productAPI.getProductByName(params);
        setProducts(response.data);
        if (response.data.length == 0) {
            setSearchBoxHeight("0");
        } else {
            setSearchBoxHeight("50vh");
        }
    }

    return (
        <div className='widget widget-search'>
            <form className='search-wrapper mb-3'>
                <input type="text" name='search' id='seach' placeholder='Search...' defaultValue={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <button type='submit'>
                    <i className='icofont-search-2'></i>
                </button>
            </form>

            <Box
                sx={{
                    overflow: "scroll",
                    overflowX: "hidden",
                    height: searchBoxHeight,
                }}
            >
                {
                    products.map((product, index) => (
                        <Link key={index} to={`/shop/${product.timepiece.timepieceId}`}>
                            <div className='d-flex gap-3 p-2'>
                                <div>
                                    <div className='pro-thumb h-25'>
                                        <img src={product.mainImage?.imageUrl} alt="" width={70} className='flex-{grow|shrink}-0' />
                                    </div>
                                </div>
                                <div className='product-content'>
                                    <p>
                                        {product.timepiece.timepieceName}
                                    </p>
                                    <h6>
                                        <NumericFormat className='border border-0' suffix=' vnd' thousandSeparator="," value={product.timepiece.price} />
                                    </h6>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </Box>
        </div>
    )
}

export default Search