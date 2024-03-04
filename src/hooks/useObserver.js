import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
    const observer = useRef();
    useEffect(() => {
        if (isLoading) return; // до создания нового обзервера даже не доходим
        // The condition is used as a guard clause to ensure that the IntersectionObserver setup and observation occur only when the component is not in the process of loading data.
        if(observer.current) observer.current.disconnect() // отключаем наблюдение за всеми элементами за которыми наблюдает обзервер в текущий момент
        let cb = function(entries, observer){
            if (entries[0].isIntersecting && canLoad) {  // получаем по нулевому индексу наш наблюдаемый элемент и по полю isIntersecting проверить в зоне видимости ли он или нет
                callback()
            }
        };

        observer.current = new IntersectionObserver(cb)
        observer.current.observe(ref.current) // За каким элементом мы наблюдаем
    }, [isLoading])
}