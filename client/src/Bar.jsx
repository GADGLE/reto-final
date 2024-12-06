import { Box, Typography, } from "@mui/material"
import FaceIcon from '@mui/icons-material/Face';

const Bar = ({ recipient }) => {

    return (
        <Box sx={{
            backgroundColor: '#5d9ff0',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <FaceIcon fontSize="large"></FaceIcon>
            <Typography>{recipient}</Typography>
        </Box>
    )
}

export default Bar