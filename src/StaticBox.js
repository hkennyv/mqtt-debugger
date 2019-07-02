import React from 'react';
import { Input, TextArea } from 'semantic-ui-react';

const StaticBox = props => {
    const { message, topic } = props;
    const { onChangeInput1, onSubmitInput1 } = props;

    return (
        <div className="mqttarea">
            <p>Subscribed to: {topic}</p>
            <form onSubmit={onSubmitInput1}>
                <Input size="mini" label="Topic:" onChange={onChangeInput1} />
            </form>
            <TextArea rows={5} value={message} />
        </div>
    );
}

export default StaticBox;