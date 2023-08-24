export const navbarStyles = {
    drawer: {
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
        },
        '& .Mui-selected': {
            color: 'red',
        },
    },
    icons: {
        marginLeft: '20px',
        fontSize: '1rem'
    },
    text: {
        '& span': {
            marginLeft: '-10px',
            fontWeight: '600',
            fontSize: '16px',
        }
    }
};