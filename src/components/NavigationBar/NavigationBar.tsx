import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../features/sidebar/sidebarSlice";

const NavigationBar: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <AppBar
            position="fixed"
            sx={{
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 10,
                height: "60px",
                backgroundColor: "#333",
                padding: "0 16px",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                    padding: 0,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexGrow: 1,
                    }}
                >
                    <Button
                        onClick={() => dispatch(toggleSidebar())}
                        sx={{
                            backgroundColor: "transparent",
                            color: "white",
                            fontSize: "16px",
                            "&:hover": {
                                color: "#ddd",
                                backgroundColor: "transparent",
                            },
                            textTransform: "none",
                        }}
                    >
                        Menu
                    </Button>
                    <Button sx={{ color: "white" }}>Products</Button>
                    <Button sx={{ color: "white" }}>Warehouses</Button>
                    <Button sx={{ color: "white" }}>About</Button>
                    <Button sx={{ color: "white" }}>User</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
