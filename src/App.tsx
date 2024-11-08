import React, { useState } from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar/NavigationBar.tsx";
import ProductList from "./components/ProductList/ProductList.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";

const App: React.FC = () => {
    // State to manage sidebar visibility
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app">
            {/* Pass the toggle function to NavigationBar and the state to Sidebar */}
            <NavigationBar toggleSidebar={toggleSidebar} />
            <div className="main-content">
                {/* Pass the 'isOpen' state to the Sidebar */}
                <Sidebar isOpen={isSidebarOpen} />
                <ProductList />
            </div>
        </div>
    );
};

export default App;
