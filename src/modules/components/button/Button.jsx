import React from 'react'
import {
    ButtonWrapper,
} from './StyledComponent.js';

const Button = props => {
    const{
        name
    } = props
    return (
        <ButtonWrapper data-at={'CompareButtons__buttonwrapper'}>
            <ButtonWrapper.text children={name}/>
        </ButtonWrapper>
    )
}

export default React.memo(Button);
