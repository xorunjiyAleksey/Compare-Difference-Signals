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
import CustomInput from '../../../components/сustomInput/CustomInput.jsx';
import { getSignalsByPattern } from "./logic";

const SdsService = props => {
    const {
        sendSdsSignal,
        getSdsSignals,
    } = props

    const [inputStatus, setInputStatus] = useState(
        {
            parth: 'https://dev-signals.umarkets.ai/autochartist/',
            chart: 'v1/chartpatterns',
            fibonacci: 'v1/fibonaccipatterns',
            keyLevels: 'v1/keylevelspattern',
        }
    );

    const statusButtons = [
        { label:' '},
        { buttonLabel: 'get signals', name: 'chart' },
        { buttonLabel: 'get signals', name: 'fibonacci' },
        { buttonLabel: 'get signals', name: 'keyLevels' },
    ];
    const mockPlaceholder = [
        {
            name: 'parth',
            text: 'enter parth to microservice',
            link: inputStatus.parth
        },
        {
            name: 'chart',
            text: 'enter chart patterns',
            link: inputStatus.chart
        },
        {
            name: 'fibonacci',
            text:'enter fibonacci patterns',
            link: inputStatus.fibonacci
        },
        {
            name: 'keyLevels',
            text: 'enter key levels patterns',
            link: inputStatus.keyLevels
        }
    ];
    const statusLabel = ['100', '200', '300', '400', '500'];

    const handleChange = event => {
        const { name, value } = event.target;

        setInputStatus(preValue => ({
            ...preValue,
             [name]: value,
        }))
    }

    const handleClick = pattern => {
        const patternData = {
            parth: inputStatus.parth,
            pattern: inputStatus[pattern],
        };
            getSignalsByPattern(patternData)
                .then(signals => sendSdsSignal({
                    signals,
                    pattern,
                }));
    }

    return (
        <Wrapper>
            <WrapperContainer>
                <LabelDiv>
                    <Label children={'Sds service'}></Label>
                </LabelDiv>
                <InputWrapper>
                    {mockPlaceholder.map((input) =>
                        <InputWrapper.input key={`${input.name}-${new Date().getTime().toString()}`}>
                            <CustomInput
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
                    {statusButtons.map((button) =>
                        <InputWrapper.button key={`${button.name}-${new Date().getTime().toString()}`}>
                            <Button
                                name={button.name}
                                label={button.label}
                                handleClick={() => handleClick(button.name)}
                                buttonLabel={button.buttonLabel}
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
