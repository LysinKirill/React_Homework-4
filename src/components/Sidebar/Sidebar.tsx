import React from 'react';
import './styles.css';

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <input type="text" placeholder="Search products..." />
            <label>
                <input type="checkbox" />
                Show only items in stock
            </label>
            <select>
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
            </select>
        </aside>
    );
};

export default Sidebar;
