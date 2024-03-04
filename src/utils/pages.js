export const getPagesCount = (totalCount, limit) => { // Принимает общее кол-во элементов
    return Math.ceil(totalCount / limit)
}

// export const getPagesArray = (totalPages) => {
//     let result = []
//     for (let i = 0; i < totalPages; i++) {
//         result.push(i + 1)
//     }
//     return result
// }


// Math.ceil используется для того чтобы к примеру если элементов у нас 105
// а лимит 10 то 105 / 10 = 10.5, нам необходимо округлить до 11 чтобы получилось 11 страниц
// и на последней странице мы могли бы отобразить пять оставшихся элементов












// ДЗ СДЕЛАТЬ ХУК usePagination ВМЕСТО ПРСОТОГО МАССИВА