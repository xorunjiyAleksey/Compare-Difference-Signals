import React from 'react';
import { TableColumnContent } from './StyledComponent';

const TableSignals = props => {
    const {
        signals,
        showDiff,
        signalName,
    } = props;

    const {
        diffId = [],
        diffKeys = [],
        diffSdsValues = [],
        diffMicroserviceValue = [],
    } = signals || {};

    return (
        <>
            {
                diffId.length ?
                    diffId.map(el =>
                        <TableColumnContent>
                            <TableColumnContent.content key={el}
                                                        children={el}
                                                        onClick={showDiff}
                            />
                        </TableColumnContent>
                ) : null
            }
            {
                diffKeys.length ?
                diffKeys.map(el =>
                        <TableColumnContent>
                            <TableColumnContent.content key={el}
                                                        children={el}
                                                        onClick={showDiff}
                            />
                        </TableColumnContent>
                ) : null
            }
            {
                diffSdsValues.length ?
                diffSdsValues.map(el =>
                        <TableColumnContent>
                            <TableColumnContent.content key={el}
                                                        children={el}
                                                        onClick={showDiff}
                            />
                        </TableColumnContent>
                ) : null
            }
            {
                diffMicroserviceValue.length ?
                diffMicroserviceValue.map(el =>
                        <TableColumnContent>
                            <TableColumnContent.content key={el}
                                                        children={el}
                                                        onClick={showDiff}
                            />
                        </TableColumnContent>
                ) : null
            }
        </>
    );
};

export default React.memo(TableSignals);