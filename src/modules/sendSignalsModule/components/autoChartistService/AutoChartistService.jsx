import React from 'react';
import {
    StDiv,
    Label,
    Wrapper,
    LabelDiv,
    ButtonDiv,
    InputWrapper,
    ButtonWrapper,
    ResponseStatus,
} from './styledComponent';
import Button from '../../../components/button/Button.jsx'
import CustomInput from '../../../components/CustomInput/CustomInput.jsx';

const AutoChartistService = () => {
    const mockPlaceholder = ['', '', 'enter parth to microservice', 'enter chart patterns', 'enter fibonacci patterns', 'enter key levels patterns'];
    const statusButtons = [{ label: 'sid' }, { label: 'umid' }, 'get signals', 'get signals', 'get signals'];

    return (
        <Wrapper>
            <StDiv>
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
            </StDiv>
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

export default React.memo(AutoChartistService);