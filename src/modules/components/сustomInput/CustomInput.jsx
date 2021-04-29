import React from 'react';
import { Input } from './styledComponent.js';

const CustomInput = props => {
    const {
        link,
        name,
        value,
        handleChange,
        placeholder
    } = props;

    const inputValue = link ? link : value;

    return (
        <Input name={name}
               value={inputValue}
               onChange={handleChange}
               placeholder={placeholder}
        />
    );
};
export default React.memo(CustomInput);