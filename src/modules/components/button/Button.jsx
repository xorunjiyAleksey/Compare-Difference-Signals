import React from 'react'
import {
    ButtonWrapper,
    LabelContainer,
} from './StyledComponent.js';

const Button = props => {
    const {
        name,
        label,
        handleClick,
        buttonLabel,
    } = props;

    return (
        label
            ?
                <LabelContainer>
                    <LabelContainer.label>
                        {label}
                    </LabelContainer.label>
                </LabelContainer>
            :
                <ButtonWrapper data-at={'compare-buttons__button-wrapper'}
                               name={name}
                               onClick={handleClick}
                >
                    <ButtonWrapper.text children={buttonLabel}/>
                </ButtonWrapper>
    );
}

export default React.memo(Button);
