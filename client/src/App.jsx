import { Fragment, useState, useRef, useEffect } from "react";
import { Box, Container } from '@mui/material';
import NameInput from "./NameInput";
import Chat from "./Chat";
import SelectName from "./SelectName";
import { createClient } from "graphql-ws";


const App = () => {
  const [uiIndex, setUiIndex] = useState(1)
  const [userName, setUserName] = useState("")
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState("")

  const chatRef = useRef(null);

  const client = createClient({
    url: 'ws://localhost:4000/graphql',
    connectionParams: {
      username: userName,
      recipient
    }
  })


  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <Fragment>
      <Container maxWidth="sm">
        <Box sx={{
          height: '100vh',
          width: '600px'
        }}>
          {uiIndex === 1 && <NameInput setUiIndex={setUiIndex} setUserName={setUserName} userName={userName} />}
          {uiIndex === 2 && <SelectName setUiIndex={setUiIndex} setRecipient={setRecipient} />}
          {uiIndex === 3 && <Chat client={client} setUiIndex={setUiIndex} setMessages={setMessages} recipient={recipient} userName={userName} chatRef={chatRef} messages={messages} />}


        </Box>
      </Container>
    </Fragment>
  );
};

export default App;