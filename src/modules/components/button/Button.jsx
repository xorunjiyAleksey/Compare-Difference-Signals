import React from 'react'
import {
    ButtonWrapper,
    LabelContainer,
} from './StyledComponent.js';

const Button = props => {
    const {
        name,
        handleClick,
    } = props;

    return (
        name.label ?
            <LabelContainer>
                <LabelContainer.label>
                    {name.label}
                </LabelContainer.label>
            </LabelContainer>
        : <ButtonWrapper data-at={'compare-buttons__button-wrapper'} onClick={handleClick}>
            <ButtonWrapper.text children={name}/>
        </ButtonWrapper>
    );
}

export default React.memo(Button);
