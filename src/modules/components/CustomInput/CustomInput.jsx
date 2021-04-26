import React from 'react';
import { Input } from './styledComponent.js';

const CustomInput = props => {
    const {
        value,
        handleChange,
        placeholderName
    } = props;

    return (
        <Input value={value}
               onChange={handleChange}
               placeholder={placeholderName}
        />
    );
};

export default React.memo(CustomInput);