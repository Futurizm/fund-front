import React from 'react';


// необходимо реализовать двухстороннее связывание и сделать этот компонент управляемым
const MySelect = ({options, defaultValue, value, onChange}) => { // массив опций
    return ( 
        <select 
            value={value}
            onChange={event => onChange(event.target.value)}  // передаем не сам эвент, а само значение
        >
            <option disabled value="">{defaultValue}</option>
                {options.map(option => 
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>    
                )}
        </select>
     );
}
 
export default MySelect;