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
        sendAutoSignal,
        btnStatus,
        getAutochartistSignals
    } = props;
    const [signalData, setSignalData] = useState({
        umid: '763e05a3c3cb4e7b8ff787a47c4077cb',
        sid: 'e76edd81-7c2f-4ea6-9b94-d7c831c62a54',
        parth: 'https://uat-services.umarkets.info/srvgtw/autochartist/',
        chart: 'v1/chartpatterns',
        fibonacci: 'v1/fibonaccipatterns',
        keyLevels: 'v1/keylevelspattern'
    });

    const mockPlaceholder = [{ sid: '', name: 'sid' }, { umid: '', name: 'umid' }, { name: 'parth', text: 'enter parth to microservice', link: signalData.parth }, { name: 'chart', text: 'enter chart patterns', link: signalData.chart }, { name: 'fibonacci', text:'enter fibonacci patterns', link: signalData.fibonacci }, { name: 'keyLevels', text: 'enter key levels patterns', link: signalData.keyLevels }];
    const signalsButtons = [ { label: 'sid', name: 'sid' }, { label: 'umid', name: 'umid' }, { label:' '}, { buttonLabel: 'get signals', name: 'chart' }, { buttonLabel: 'get signals', name: 'fibonacci' }, { buttonLabel: 'get signals', name: 'keyLevels' }];
    const statusLabel = ['100', '200', '300', '400', '500'];

    const handleChange =  event => {
        const { name, value } = event.target;
        setSignalData(preValue => ({
            ...preValue,
            [name]: value,
        }))
    }

    const handleClick = pattern => {
        const patternData = {
            parth: signalData.parth,
            pattern: signalData[pattern],
            sid: signalData.sid,
            umid: signalData.umid
        };
        getSignalsByPattern(patternData)
            .then(signals => sendAutoSignal({
                signals,
                pattern,
            }));
    }

    return (
        <Wrapper>
            <WrapperContainer>
                <LabelDiv>
                    <Label children={'Autochartist service'}></Label>
                </LabelDiv>
                <InputWrapper>
                    {mockPlaceholder.map((input, id) =>
                        <InputWrapper.input>
                            <CustomInput
                                key={id}
                                link={input?.link}
                                name={input.name}
                                placeholder={input.text}
                                handleChange={handleChange}
                            />
                        </InputWrapper.input>
                    )}
                </InputWrapper>
            </WrapperContainer>
            <ButtonWrapper>
                <LabelDiv/>
                <ButtonDiv>
                    {signalsButtons.map((button, id) =>
                        <InputWrapper.button>
                            <Button
                                key={id}
                                name={button.name}
                                label={button.label}
                                handleClick={() => handleClick(button.name)}
                                buttonLabel={button.buttonLabel}
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