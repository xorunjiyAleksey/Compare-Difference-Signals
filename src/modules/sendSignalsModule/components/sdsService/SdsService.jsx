import React from "react";
import {
    Label,
    Wrapper,
    LabelDiv,
    ButtonDiv,
    InputWrapper,
    ButtonWrapper,
    ResponseStatus,
    WrapperContainer,
} from './styledComponent';
import Button from '../../../components/button/Button.jsx'
import CustomInput from '../../../components/CustomInput/CustomInput.jsx';

const SdsService = () => {
    const mockPlaceholder = ['enter parth to microservice', 'enter chart patterns', 'enter fibonacci patterns', 'enter key levels patterns'];
    const statusButtons = [ 'get signals', 'get signals', 'get signals', 'get signals'];

    return (
        <Wrapper>
            <WrapperContainer>
                <LabelDiv>
                    <Label children={'Autochartist service'}></Label>
                </LabelDiv>
                <InputWrapper>
                    {mockPlaceholder.map((placeholderName, id) =>
                        <InputWrapper.input>
                            <CustomInput
                                key={id}
                                placeholderName={placeholderName}
                            />
                        </InputWrapper.input>
                    )}
                </InputWrapper>
            </WrapperContainer>
            <ButtonWrapper>
                <LabelDiv/>
                <ButtonDiv>
                    {statusButtons.map((name, id) =>
                        <InputWrapper.input>
                            <Button key={id} name={name}/>
                        </InputWrapper.input>
                    )}
                    <ResponseStatus>
                    </ResponseStatus>
                </ButtonDiv>
            </ButtonWrapper>
        </Wrapper>
    );
}

export default React.memo(SdsService);