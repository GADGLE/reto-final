import { Fragment, useEffect, useState } from "react";
import ListMessages from "./ListMessages";
import TextFieldInput from "./TextFieldInput";
import subscriptionQuery from "./utils/subscription";
import Bar from "./Bar";





const Chat = ({ setMessages, chatRef, messages, userName, recipient, client }) => {
    const [input, setInput] = useState('');

    useEffect(() => {
        const unsubscribe = (async () => { client.subscribe(
            {
                query: subscriptionQuery,
            },
            {
                next: ({data}) => {
                    console.log(data);
                    const { content, sender, recipient } = data.messageReceived;
                    setMessages((prevMessages) => [...prevMessages, { sender, content, recipient }])
                },
                error: (err) => {
                    console.error('Error sending message:', err);
                },
                complete: () => {
                    console.log('Mutation complete');
                },
            }
        )


    })()
    return () => { unsubscribe }
}, [])
    





    return (
        <Fragment>
            <Bar recipient={recipient}/>
            <ListMessages chatRef={chatRef} userName={userName} messages={messages} />
            <TextFieldInput input={input} setInput={setInput} userName={userName} recipient={recipient} client={client}/>
        </Fragment>
    )
}

export default Chat