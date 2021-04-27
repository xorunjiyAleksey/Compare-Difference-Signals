import React, { useState } from "react";
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

const SdsService = props => {
    const statusButtons = [ 'get signals', 'get signals', 'get signals', 'get signals'];
    const mockPlaceholder = [{microservice: 'enter parth to microservice'}, {chartPatterns: 'enter chart patterns'}, {fibonacciPatterns:'enter fibonacci patterns'}, {keyLevelsPatterns: 'enter key levels patterns'}];    const {

    } = props;
    const [inputStatus, setInputStatus] = useState({
        value:'',
    });

    const handleChange = event => {
        const { value } = event.target;
        setInputStatus(value);
        console.log(inputStatus);
    }

    const handleClick = () => {

    };
    return (
        <Wrapper>
            <WrapperContainer>
                <LabelDiv>
                    <Label children={'Sds service'}></Label>
                </LabelDiv>
                <InputWrapper>
                    {mockPlaceholder.map((placeholderName, id) =>
                        <InputWrapper.input>
                            <CustomInput
                                key={id}
                                placeholderName={placeholderName}
                                handleChange={handleChange}
                            />
                        </InputWrapper.input>
                    )}
                </InputWrapper>
            </WrapperContainer>
            <ButtonWrapper>
                <LabelDiv/>
                <ButtonDiv>
                    {statusButtons.map((name, id) =>
                        <InputWrapper.button>
                            <Button key={id}
                                    name={name}
                                    handleClick={handleClick}
                            />
                        </InputWrapper.button>
                    )}
                    {/*<ResponseStatus>*/}
                    {/*</ResponseStatus> открыть когда будут приходить статусы*/}
                </ButtonDiv>
            </ButtonWrapper>
        </Wrapper>
    );
}

export default React.memo(SdsService);