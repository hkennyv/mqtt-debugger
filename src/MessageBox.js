import React from 'react';
import { Input, TextArea } from 'semantic-ui-react';

function renderMessages(messages) {
    console.log(messages);
    let msgStrs = [];
    for (let i = 0; i < messages.length; i++) {
        try {
            msgStrs.push(JSON.stringify(JSON.parse(messages[i]), null, 2));
        } catch (err) {
            msgStrs.push(messages[i]);
        }
    }
    return msgStrs.join('\n');
}

const MessageBox = props => {
    const { messages, topic } = props;
    const { onChangeInput, onSubmitInput } = props;

    return (
        <div className="msgbox">
            <p>Subscribed to: {topic}</p>
            <form onSubmit={onSubmitInput}>
                <Input fluid size="mini" label="Topic:" onChange={onChangeInput} />
            </form>
            <TextArea rows={5} value={renderMessages(messages)} />
        </div>
    );
}

export default MessageBox;