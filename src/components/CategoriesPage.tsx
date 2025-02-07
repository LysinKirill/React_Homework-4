import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setCategories } from '../features/categories/categorySlice';
import {Button, Dialog, TextField, Box, Typography, List, ListItem, IconButton, Paper} from '@mui/material';
import { ICategoryProps } from './ProductList/types.ts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoriesPage: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedCategory, setEditedCategory] = useState<ICategoryProps | null>(null);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = () => {
        setAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
        setNewCategoryName('');
    };

    const handleAddCategorySave = () => {
        if (newCategoryName.trim()) {
            const newCategory: ICategoryProps = {
                id: Date.now(), // Using Date.now() for a unique ID for now
                name: newCategoryName,
            };
            dispatch(setCategories([...categories, newCategory]));
            handleCloseAddModal();
        }
    };

    const handleEditCategory = (category: ICategoryProps) => {
        setEditedCategory(category);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setEditedCategory(null);
    };

    const handleEditCategorySave = () => {
        if (editedCategory) {
            const updatedCategories = categories.map((cat) =>
                cat.id === editedCategory.id ? editedCategory : cat
            );
            dispatch(setCategories(updatedCategories));
            handleCloseEditModal();
        }
    };

    const handleDeleteCategory = (id: number) => {
        const updatedCategories = categories.filter((cat) => cat.id !== id);
        dispatch(setCategories(updatedCategories));
    };

    return (
        <Paper elevation={3} sx={{maxWidth: 800, margin: '20px auto', padding: 3}}>
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4">Categories</Typography>
            <Button variant="contained" onClick={handleAddCategory} sx={{ mt: 2 }}>
                Add Category
            </Button>

            <List>
                {categories.map((category) => (
                    <ListItem key={category.id}>
                        <Typography variant="body1">{category.name}</Typography>
                        <IconButton onClick={() => handleEditCategory(category)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteCategory(category.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            {/* Add Category Modal */}
            <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
                <Box sx={{ padding: 4 }}>
                    <Typography variant="h6">Add New Category</Typography>
                    <TextField
                        label="Category Name"
                        fullWidth
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button variant="contained" onClick={handleAddCategorySave} sx={{ mt: 2 }}>
                        Save
                    </Button>
                </Box>
            </Dialog>

            {/* Edit Category Modal */}
            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
                <Box sx={{ padding: 4 }}>
                    <Typography variant="h6">Edit Category</Typography>
                    <TextField
                        label="Category Name"
                        fullWidth
                        value={editedCategory?.name || ''}
                        onChange={(e) =>
                            setEditedCategory({
                                ...editedCategory!,
                                name: e.target.value,
                            })
                        }
                        sx={{ mt: 2 }}
                    />
                    <Button variant="contained" onClick={handleEditCategorySave} sx={{ mt: 2 }}>
                        Save
                    </Button>
                </Box>
            </Dialog>
        </Box>
        </Paper>
    );
};

export default CategoriesPage;
