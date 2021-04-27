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
import { getSignalsByPattern } from "./logic";

const SdsService = props => {
    const {
        sendSignal,
    } = props

    const [inputStatus, setInputStatus] = useState({
        parth: 'https://dev-signals.umarkets.ai/autochartist/',
        pattern: ''
    });

    const statusButtons = [{label:' '}, 'get signals', 'get signals', 'get signals'];
    const mockPlaceholder = [{parth: 'enter parth to microservice', link: inputStatus.parth }, {pattern: 'enter chart patterns'}, {pattern:'enter fibonacci patterns'}, {pattern: 'enter key levels patterns'}];
    const statusLabel = ['100', '200', '300', '400', '500'];

    const handleChange = event => {
        const { name, value } = event.target;
        setInputStatus(preValue => ({
            ...preValue,
             [name]: value,
        }))
        console.log(inputStatus);
    }

    const handleClick = () => {
            getSignalsByPattern(inputStatus)
                .then(signals => sendSignal(signals));
    }

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