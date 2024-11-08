import React from 'react';
import './styles.css';

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <input type="text" placeholder="Search products..." className="sidebar-item" />
            <label className="sidebar-item">
                Show only items in stock <input type="checkbox" />
            </label>
            <select className="sidebar-item">
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
            </select>
        </aside>
    );
};

export default Sidebar;
