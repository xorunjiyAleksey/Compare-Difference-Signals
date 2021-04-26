import React from 'react'
import {
    ButtonWrapper,
    LabelContainer,
} from './StyledComponent.js';

const Button = props => {
    const {
        name,
        onClick
    } = props;

    return (
        name.label ?
            <LabelContainer>
                <LabelContainer.label>
                    {name.label}
                </LabelContainer.label>
            </LabelContainer>
        : <ButtonWrapper data-at={'compare-buttons__button-wrapper'}>
            <ButtonWrapper.text children={name}
                                onClick={onClick}
            />
        </ButtonWrapper>
    );
}

export default React.memo(Button);
