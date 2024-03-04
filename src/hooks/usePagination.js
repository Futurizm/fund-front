import {useMemo} from "react"


export const usePagination = (totalPages) => {
    let array = []
    const result = useMemo(() => {
        for (let i = 0; i < totalPages; i++) {
            array.push(i + 1)
        }
        return array
    }, [totalPages])

    return result
}