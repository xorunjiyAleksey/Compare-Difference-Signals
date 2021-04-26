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
               placeholder={placeholderName}
               onChange={handleChange}
        />
    );
};

export default React.memo(CustomInput);