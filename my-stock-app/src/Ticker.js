import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Toolbar, CssBaseline, Drawer, Button } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import Analysis from './Analysis';
import Summary from "./Summary";

const drawerWidth = 240;

function TickerContent() {
    const [selectedPage, setSelectedPage] = useState('Summary');
    const navigate = useNavigate(); // 使用 useNavigate 钩子

    const handleNavigation = (page) => {
        setSelectedPage(page);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['Summary', 'Analysis'].map((text) => (
                            <ListItem button key={text} onClick={() => handleNavigation(text)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Button
                    variant="contained"
                    onClick={handleBack}
                >
                    Back to home
                </Button>
                {selectedPage === 'Analysis' && <Analysis />}
                {selectedPage === 'Summary' && <Summary />}
                {/*{selectedPage === 'Price history' && <div>Price History Content</div>}*/}
            </Box>
        </Box>
    );
}

function DashboardLayoutBasic() {
    return (
        <AppProvider>
            <DashboardLayout>
                <TickerContent />
            </DashboardLayout>
        </AppProvider>
    );
}

export default DashboardLayoutBasic;
