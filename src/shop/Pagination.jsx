const Pagination = ({ productPerPage, totalProducts, paginate, activePage }) => {
    const pageNumbers = [];
    for (let index = 1; index <= Math.ceil(totalProducts / productPerPage); index++) {
        pageNumbers.push(index);
    }

    return (
        <ul className="default-pagination lab-ui list-group-horizental">
            <li className={`list-group-item ${activePage === 1 ? "disabled" : ""}`}>
                <a href="#" onClick={(e) => {
                    e.preventDefault()
                    if (activePage < pageNumbers.length) {
                        paginate(activePage - 1)
                    }
                }}>
                    <i className="icofont-rounded-left"></i>
                </a>
            </li>
            {
                pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${number === activePage ? "bg-warning" : ""}`}>
                        <button onClick={() => paginate(number)} className="bg-transparent">{number}</button>
                    </li>
                ))
            }
            <li className={`list-group-item ${activePage === pageNumbers.length ? "disabled" : ""}`}>
                <a href="#" onClick={(e) => {
                    e.preventDefault()
                    if (activePage < pageNumbers.length) {
                        paginate(activePage + 1)
                    }
                }}>
                    <i className="icofont-rounded-right"></i>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
