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
import CustomInput from '../../../components/сustomInput/CustomInput.jsx';
import { getSignalsByPattern } from "./logic";

const AutoChartistService = props => {
    const {
        sendSignal,
        btnStatus
    } = props;

    console.log('sendSignal', sendSignal, 'btnStatus' ,btnStatus)
    const [signalData, setSignalData] = useState({
        pattern: '',
        sid: '',
        umid: '',
        parth: 'https://dev-services.maximarkets.org/srvgtw/autochartist/'
    });

    const mockPlaceholder = [{ sid: '' }, { umid: '' }, { parth: 'enter parth to microservice', link: signalData.parth }, { pattern: 'enter chart patterns' }, { pattern:'enter fibonacci patterns' }, { pattern: 'enter key levels patterns' }];
    const signalsButtons = [ { label: 'umid' }, { label: 'sid' }, { label:' '}, { buttonLabel: 'get signals', name: 'chart' }, { buttonLabel: 'get signals', name: 'fibonacci' }, { buttonLabel: 'get signals', name: 'key levels' }];
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
        .then(signals => sendSignal(signals));
    }
    console.log(signalData)
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