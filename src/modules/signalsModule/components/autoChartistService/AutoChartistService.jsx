import React, { useState } from 'react';
import {
    Label,
    Wrapper,
    LabelDiv,
    ButtonDiv,
    InputWrapper,
    ButtonWrapper,
    StatusWrapper,
    ResponseStatus,
    WrapperContainer,
} from './styledComponent';
import Button from '../../../components/button/Button.jsx'
import CustomInput from '../../../components/CustomInput/CustomInput.jsx';
import { getSignalsByPattern } from "./logic";

const AutoChartistService = props => {
    const {
        sendSignal,
        btnStatus
    } = props;

    console.log('sendSignal', sendSignal, 'btnStatus' ,btnStatus)

    const mockPlaceholder = [{ sid: '' }, { umid: '' }, {microservice: 'enter parth to microservice'}, {chartPatterns: 'enter chart patterns'}, {fibonacciPatterns:'enter fibonacci patterns'}, {keyLevelsPatterns: 'enter key levels patterns'}];
    const signalsButtons = [{ label: 'sid' }, { label: 'umid' }, { label: ' ' }, 'get signals', 'get signals', 'get signals'];
    const statusLabel = ['100', '200', '300', '400', '500'];

    const [signalData, setSignalData] = useState({
        pattern: '',
        sid: '',
        umid: '',
    });

    const handleChange =  event => {
        const { value } = event.target;
        setSignalData(value)
    }

    const handleClick = () => {
        getSignalsByPattern(signalData)
        .then(signals => sendSignal(signals));
    }

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
                                handleChange={handleChange}
                                placeholderName={placeholderName}
                            />
                        </InputWrapper.input>
                    )}
                </InputWrapper>
            </WrapperContainer>
            <ButtonWrapper>
                <LabelDiv/>
                <ButtonDiv>
                    {signalsButtons.map((name, id) =>
                        <InputWrapper.button>
                            <Button key={id}
                                    name={name}
                                    handleClick={handleClick}
                            />
                        </InputWrapper.button>
                        )}
                </ButtonDiv>
            </ButtonWrapper>
            {/*<StatusWrapper>*/}
            {/*    <LabelDiv/>*/}
            {/*    {statusLabel.map((name, id) =>*/}
            {/*        <ResponseStatus key={id}*/}
            {/*                        name={name}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*</StatusWrapper>*/}
        </Wrapper>
    );
}

export default React.memo(AutoChartistService);