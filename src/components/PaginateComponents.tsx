import { Key } from "react";

type ProductType = {
    numbersPage: any,
    prePage: any,
    nextPage: any,
    changePage: any,
    currentPage: any,
    arrayOfCurPage: any
}

const PaginateComponents = ({ numbersPage, arrayOfCurPage, prePage, nextPage, changePage, currentPage }: ProductType) => {
    return <>
        <ul key={currentPage} className="flex space-x-3 justify-center mt-8">
            <li onClick={prePage} className={`flex ${currentPage === 1 ? "hidden" : ""} items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
                    <path
                        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                        data-original="#000000" />
                </svg>
            </li>
            {
                arrayOfCurPage && arrayOfCurPage.map((item: string, index: Key) => (
                    <li onClick={() => changePage(item)} key={index} className={`flex ${currentPage === item ? 'bg-primary-500' : ''} items-center justify-center shrink-0 cursor-pointer text-sm font-bold text-[#333] w-9 h-8 rounded`}>
                        {item}
                    </li>
                ))
            }
            <li onClick={nextPage} className={`flex ${currentPage === (numbersPage && numbersPage.length) ? "hidden" : ""} items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
                    <path
                        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                        data-original="#000000" />
                </svg>
            </li>
        </ul>
    </>;
}

export default PaginateComponents;