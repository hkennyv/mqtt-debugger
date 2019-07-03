import React from 'react';
import { Input, TextArea } from 'semantic-ui-react';

function renderMessage(message) {
    try {
        return JSON.stringify(JSON.parse(message), null, 2);
    } catch (err) {
        return message;
    }
}

const StaticBox = props => {
    const { message, topic } = props;
    const { onChangeInput1, onSubmitInput1 } = props;

    return (
        <div className="msgbox">
            <p>Subscribed to: {topic}</p>
            <form onSubmit={onSubmitInput1}>
                <Input fluid size="mini" label="Topic:" onChange={onChangeInput1} />
            </form>
            <TextArea rows={5} value={renderMessage(message)} />
        </div>
    );
}

export default StaticBox;