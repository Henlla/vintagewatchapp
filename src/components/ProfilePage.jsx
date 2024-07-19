import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageHeader from './PageHeader';
import ProfileInformation from './Profile/ProfileInformation';
import ProductSellPage from './Profile/ProductSellPage';
import TransactionPage from './Profile/TransactionPage';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfilePage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <PageHeader title="Profile" curPage="Profile" />
            <Box sx={{ width: '100%', padding: 1 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Profile Information" {...a11yProps(0)} />
                        <Tab label="Product Sell" {...a11yProps(1)} />
                        {/* <Tab label="Transaction" {...a11yProps(2)} /> */}
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Typography variant='h4' marginBottom={2}>Update Profile</Typography>
                    <ProfileInformation />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Typography variant='h4' marginBottom={2}>Product Sell</Typography>
                    <ProductSellPage />
                </CustomTabPanel>
                {/* <CustomTabPanel value={value} index={2}>
                    <Typography variant='h4' marginBottom={2}>Transaction</Typography>
                    <TransactionPage />
                </CustomTabPanel> */}
            </Box>
        </>
    );
}