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
        sendAutoSignal,
        btnStatus,
        getAutochartistSignals
    } = props;
    const [signalData, setSignalData] = useState({
        pattern: '',
        sid: 'c5e3203fae0a44ad912d2b505a51275a',
        umid: 'e4ca9a3c-d14d-41c8-8567-c22cb751fa0a',
        parth: 'https://uat-services.maximarkets.org/srvgtw/autochartist/'
    });

    const mockPlaceholder = [{ sid: '' }, { umid: '' }, { parth: 'enter parth to microservice', link: signalData.parth }, { pattern: 'enter chart patterns' }, { pattern:'enter fibonacci patterns' }, { pattern: 'enter key levels patterns' }];
    const signalsButtons = [{ label: 'umid' }, { label: 'sid' }, { label: ' ' }, 'get signals', 'get signals', 'get signals'];
    const statusLabel = ['100', '200', '300', '400', '500'];

    const handleChange =  event => {
        const { name, value } = event.target;
        setSignalData(preValue => ({
            ...preValue,
            [name]: value,
        }))
    }

    const handleClick = () => {
        getSignalsByPattern(signalData)
        .then(signals => sendAutoSignal(signals));
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