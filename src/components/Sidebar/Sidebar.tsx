import React, { useState } from "react";
import {
    Box,
    InputBase,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel
} from '@mui/material';

interface SidebarProps {
    isOpen: boolean;
    onSearch: (query: string) => void;
    onToggleInStock: (checked: boolean) => void;
    onCategoryChange: (category: string) => void;
    onResetFilters: () => void;
    categories: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
                                             isOpen,
                                             onSearch,
                                             onToggleInStock,
                                             onCategoryChange,
                                             onResetFilters,
                                             categories,
                                         }) => {

    const [selectedCategory, setSelectedCategory] = useState("");


    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        onCategoryChange(value);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 80,
                left: 0,
                bottom: 0,
                width: '15rem',
                padding: '16px',
                backgroundColor: 'rgb(3, 3, 23)',
                borderRight: '1px solid #080b2e',
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none',
            }}
        >
            <Box sx={{mb: 2}}>
                <InputBase
                    placeholder="Search products..."
                    sx={{
                        width: '100%',
                        backgroundColor: '#090d3c',
                        color: '#5f62ae',
                        padding: '8px',
                        borderRadius: 1,
                    }}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </Box>

            <Box sx={{mb: 2}}>
                <FormControlLabel
                    control={
                        <Checkbox
                            sx={{
                                color: '#5f62ae',
                                '&.Mui-checked': {
                                    color: '#5f62ae',
                                },
                            }}
                            onChange={(e) => onToggleInStock(e.target.checked)}
                        />
                    }
                    label="Show only items in stock"
                    sx={{
                        color: '#5f62ae',
                    }}
                />
            </Box>

            <Box sx={{mb: 2}}>
                <FormControl fullWidth>
                    <InputLabel sx={{color: '#5f62ae'}}>Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        sx={{
                            backgroundColor: '#090d3c',
                            color: '#5f62ae',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#5f62ae',
                            },
                            '&:focus .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#5f62ae',
                            },
                        }}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Button
                    onClick={onResetFilters}
                    sx={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: '#333',
                        color: '#fff',
                        marginTop: '10px',
                        borderRadius: 1,
                    }}
                >
                    Reset Filters
                </Button>
            </Box>
        </Box>
    );
};

export default Sidebar;
