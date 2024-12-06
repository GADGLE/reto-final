import { Box, TextField, InputAdornment, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import mutation from "./utils/mutation";


const TextFieldInput = ({ input, setInput, client, userName, recipient }) => {

    const sendMessage = async () => {
        if (input.trim() === '') return;

        client.subscribe(
            {
                query: mutation,
                variables: { content: input, sender: userName, recipient },
            },
            {
                next: ({ data }) => {
                    console.log("Message sent successfully:", data);
                    setInput(""); // Clear the input field after successful send
                },
                error: (err) => {
                    console.error("Error sending message:", err);
                },
                complete: () => {
                    console.log("Mutation complete");
                },
            }
        )
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '10%' }} >
            <TextField
                onChange={(e) => setInput(e.target.value)}
                fullWidth
                id="input-with-icon-textfield"
                value={input}
                variant="outlined"
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button onClick={sendMessage} variant="contained" endIcon={<SendIcon />}>
                                </Button>
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </ Box>
    )
}

export default TextFieldInput