import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if(sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return posts;
    }, [sort, posts]); // колбэк будет вызван только в том случае если какая-то из зависимостей в массиве поменяет свое значение

    return sortedPosts;
}


export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
}