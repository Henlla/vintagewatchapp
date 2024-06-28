import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { ShoppingCart } from '@mui/icons-material';
import { useAuth } from '../utilis/AuthProvider';

export default function CartBadge() {
    const { cartCount } = useAuth();
    return (
        <Box
            sx={{
                color: 'action.active',
                display: 'flex',
                flexDirection: 'column',
                '& .MuiBadge-root': {
                    marginRight: 4,
                },
            }}
        >
            <div>
                <Badge
                    color="secondary"
                    badgeContent={cartCount}>
                    <ShoppingCart />
                </Badge>
            </div>
        </Box>
    );
}