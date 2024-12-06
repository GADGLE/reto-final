import { TextField, InputAdornment, Button } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

const NameInput = ({setUserName, setUiIndex, userName}) => {
    const submitName = () => {
        setUiIndex(2)
    }

    return (
        <TextField
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                id="input-with-icon-textfield"
                value={userName}
                variant="outlined"
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="start">
                                <Button onClick={submitName} variant="contained" endIcon={<FaceIcon />}>
                                </Button>
                            </InputAdornment>
                        ),
                    },
                }}
            />
    )
}

export default NameInput