import React from 'react';
import { Input, TextArea } from 'semantic-ui-react';

function renderMessages(messages) {
    try {
        return messages.map(msg => JSON.stringify(JSON.parse(msg), null, 2)).join('\n');
    } catch (err) {
        return messages.join('\n');
    }
}

const MessageBox = props => {
    const { messages, topic } = props;
    const { onChangeInput2, onSubmitInput2 } = props;

    return (
        <div className="msgbox">
            <p>Subscribed to: {topic}</p>
            <form onSubmit={onSubmitInput2}>
                <Input fluid size="mini" label="Topic:" onChange={onChangeInput2} />
            </form>
            <TextArea rows={5} value={renderMessages(messages)} />
        </div>
    );
}

export default MessageBox;