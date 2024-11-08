import React, { useState } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';

const App: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app">
            <NavigationBar toggleSidebar={toggleSidebar} />
            <div className="main-content">
                <Sidebar isOpen={isSidebarOpen} />
                <ProductList />
            </div>
        </div>
    );
};

export default App;
