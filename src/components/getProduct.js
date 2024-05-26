import React, { useState, useEffect } from 'react';

const Product = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('https://localhost:7066/api/Product')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <>
        </>
    );
};
export default Product