import React from 'react';
import { Input } from './styledComponent.js';

const CustomInput = props => {
    const {
        value,
        handleChange,
        placeholderName
    } = props;

    const inputName = Object.keys(placeholderName)[0];
    const placeName = Object.values(placeholderName)[0];
    const inputValue = placeholderName.link ? placeholderName.link : value;

    return (
        <Input name={inputName}
               value={inputValue}
               onChange={handleChange}
               placeholder={placeName}
        />
    );
};
export default React.memo(CustomInput);