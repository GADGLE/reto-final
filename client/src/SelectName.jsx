
import { ListItemText, List, ListItem, ListItemButton } from '@mui/material';

const SelectName = ({setUiIndex, setRecipient}) => {
    
    const USERS = [
        'Jose',
        'Luis',
        'Marcos',
        'Flor',
        'Ariana'
    ]

    const selectNameHandler = (e) => {
        setRecipient(e.target.innerText)
        setUiIndex(3)
    }

    return (
        <List
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        }}
        >
            {USERS.map((user, index) => (
                <ListItem  key={index}>
                    <ListItemButton sx={{
                    bgcolor: '#cfe8fc',
                    borderRadius: '1rem'
                }} onClick={selectNameHandler}>
                        <ListItemText>{user}</ListItemText>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default SelectName