import React from 'react';
import classes from './MyInput.module.css'

const MyInput = React.forwardRef((props, ref) => { // Оборачиваем целиком весь компонент для получения ссылки
    return ( 
        <input ref={ref} className={classes.myInput} {...props}/>
     );

    //  в инпут указываем куда эта ссылка должна попадать
});
 
export default MyInput;