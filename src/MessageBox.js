import React from 'react';
import { Input, TextArea } from 'semantic-ui-react';

function renderMessages(messages) {
    return messages.join('\n');
}

const MessageBox = props => {
    const { messages, topic } = props;
    const { onChangeInput2, onSubmitInput2 } = props;

    return (
        <div>
            <p>Subscribed to: {topic}</p>
            <form onSubmit={onSubmitInput2}>
                <Input size="mini" label="Topic:" onChange={onChangeInput2} />
            </form>
            <TextArea rows={5} value={renderMessages(messages)} />
        </div>
    );
}

export default MessageBox;