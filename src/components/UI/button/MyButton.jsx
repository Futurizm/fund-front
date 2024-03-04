import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({children, ...props}) => { // выцепляем children, а все остальны пропсы оставляем как есть
    return ( 
        <button {...props} className={classes.myBtn}>
            {children} 
        </button>
     );
     
    // все пропсы которые мы будем передавать в компонент MyButton будут улетать в эту кнопку
    //  По умолчанию реакт не знает в какое место компонента необходимо добавлять вложенные элементы, для этого есть спец. пропс children
}
 
export default MyButton;