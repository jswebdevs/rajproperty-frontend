import React from 'react';
import Header from '../components/global/Header';
import { Outlet } from 'react-router';
import Footer from '../components/global/Footer';

const Root = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;