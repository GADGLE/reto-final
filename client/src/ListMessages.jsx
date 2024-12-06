import { Box, List, Chip } from '@mui/material';
import { useEffect } from 'react';


const ListMessages = ({chatRef, messages, userName}) => {
    useEffect(() => {
        console.log(messages)
    }, [messages])
    return (
        <Box  ref={chatRef} sx={{ bgcolor: '#cfe8fc', height: '70vh', overflow: 'scroll'}}>
            <List sx={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column'
                
            }} >
                {messages.map((msg, index) => (
                    <Chip sx={{
                        minHeight: '3rem',
                        maxWidth: '200px',
                        height: 'auto',
                        '& .MuiChip-label': {
                            display: 'block',
                            whiteSpace: 'normal',
                        },
                        alignSelf: msg.sender === userName ? 'flex-end' : 'flex-start',
                        marginBottom: '0.5rem',
                        backgroundColor: "#edf7f7",
                        textAlign: "start",
                        textWrap: 'wrap',
                        padding: '1rem'
                    }}
                        key={index}
                        label={msg.sender === userName ? msg.content : `${msg.sender}: ${msg.content}`} />
                ))}
            </List>
        </Box>
    )
}

export default ListMessages