import React from 'react';
import PostItem from './PostItem';
import {CSSTransition, TransitionGroup} from "react-transition-group";


const PostList = (props) => {

    if (!props.posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены
            </h1>
        )
    }

    return ( 
        <div>
            <h1 style={{textAlign: 'center'}}>
                {props.title}
            </h1>
            <TransitionGroup>
                {props.posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem remove={props.remove} number={index + 1} post={post} key={post.id} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
     );
}
 
export default PostList;