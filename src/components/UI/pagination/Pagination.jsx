import React from 'react';
import {getPagesArray} from "../../../utils/pages";
import {usePagination} from "../../../hooks/usePagination";

const Pagination = ({totalPages, page, changePage}) => { // Получаем номер текущей страницы, функция которая изменяет этот номер и массив на основании которого необходимо отрисовывать элементы
    let pagesArray = usePagination(totalPages)
    return (
            <div className='page__wrapper'>
                {pagesArray.map(p =>
                     <span
                        onClick={() => changePage(p)}
                        key={p}
                        className={page === p ? 'page page__current' : 'page'}
                     >
                    {p}
                    </span>
                )}
            </div>
    );
};

export default Pagination;