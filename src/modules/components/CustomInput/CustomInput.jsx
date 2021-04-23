import React from 'react';
import { Input } from './styledComponent.js';

const CustomInput = props => {
    const {
        value,
        placeholderName
    } = props;

    return (
        <Input value={value}
               placeholder={placeholderName}
        />
    );
};

export default React.memo(CustomInput);