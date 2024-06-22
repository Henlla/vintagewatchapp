import React, { useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

const Search = ({ products, GridList }) => {
    // console.log(products)
    const [searchTerm, setSearchTerm] = useState("");
    const filteredProducts = products.filter((product) => product.timepiece?.timepieceName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className='widget widget-search'>
            <form className='search-wrapper mb-3'>
                <input type="text" name='search' id='seach' placeholder='Search...' defaultValue={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <button type='submit'>
                    <i className='icofont-search-2'></i>
                </button>
            </form>

            {/*showing search result*/}
            <div>
                {
                    searchTerm && filteredProducts.map((product) => (
                        <Link key={product.timepiece.timepieceId} to={`/shop/${product.timepiece.timepieceId}`}>
                            <div className='d-flex gap-3 p-2'>
                                <div>
                                    <div className='pro-thumb h-25'>
                                        <img src={product.mainImage?.imageUrl} alt="" width={70} className='flex-{grow|shrink}-0' />
                                    </div>
                                </div>
                                <div className='product-content'>
                                    <p>
                                        <Link to={`/shop/${product.timepiece.timepieceId}`}>{product.timepiece.timepieceName}</Link>
                                    </p>
                                    <h6>
                                        <NumericFormat className='border border-0' suffix=' vnd' thousandSeparator="," value={product.timepiece.price}/>
                                    </h6>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Search