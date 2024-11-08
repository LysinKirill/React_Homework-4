import React from 'react';
import './styles.css';

interface NavigationBarProps {
    toggleSidebar: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ toggleSidebar }) => {
    return (
        <nav className="navigation-bar">
            <button onClick={toggleSidebar}>Menu</button>
            <button>Products</button>
            <button>Warehouses</button>
            <button>About</button>
            <button>User</button>
        </nav>
    );
};

export default NavigationBar;
