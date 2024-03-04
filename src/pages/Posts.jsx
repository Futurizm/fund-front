import React, {useState, useRef, useMemo, useEffect} from 'react';
import {usePosts} from "../hooks/usePosts";
import {useFetch} from "../hooks/useFetch";
import PostService from "../API/PostService";
import {getPagesCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    // const bodyInputRef = useRef(); // С помощью этого хука мы можем получить доступ к DOM элементу и уже у этого DOM элемента забрать value
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0) // состояние в котором помещено общее кол-во постов
    const [limit, setLimit] = useState(10) // состояние лимита
    const [page, setPage] = useState(1) // состояние текущей страницы
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef() // получаем ссылку на DOM который находится последним в списке


    const [fetchPosts, arePostsLoading, postError] = useFetch(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data]) // начальные данные это posts, а потом при пагинации добавляем новые дата
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit)) // обращаемся к хэдерам и от туда достаем тот самый хэдер x-total-count
    })

    useObserver(lastElement, page < totalPages, arePostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts()
    }, [page, limit]) // массив зависимостей будет пустым для того, чтобы функция отработала единожды (#поправка, page аходится здесь чтобы при каждом переключении страницы она рендерилась

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    // async function fetchPosts() {
    //     setArePostsLoading(true)
    //     setTimeout(async () => {
    //         const posts = await PostService.getAll()
    //         setPosts(posts)
    //         setArePostsLoading(false)
    //     }, 1000)
    // }  был исключительно для примера

    // Получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }
    // В этой функции removePost, мы используем posts.filter, чтобы создать новый массив, исключая элемент, у которого id совпадает с post.id. Таким образом, мы удаляем пост с заданным id из массива posts.

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{margin: '15px 0'}} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Кол-во элементов на странице'
                options = {[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />
            {postError &&
                <h1>Произошла ошибка {postError}</h1>
            }

            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>

            {arePostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
            }

            <Pagination
                page={page}
                changePage = {changePage}
                totalPages={totalPages}
            />

        </div>
    );
}

// 2:12:25

export default Posts;




// Референс нужен не только для получения к DOM элементу, а также в него можно сохранять какие-то данные чтобы не терять их от рендера к рендеру

// Папка utils создана для различных вспомогательных функций (работа с датами, форматирование, работа со строками, с номерами страниц и т.д)
