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
               name={Object.keys(placeholderName)}
               onChange={handleChange}
               placeholder={Object.values(placeholderName)}

        />
    );
};

export default React.memo(CustomInput);