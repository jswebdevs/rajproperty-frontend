import React from 'react';
import AccountNavbar from './AccountNavbar';
import { Outlet } from 'react-router-dom';

const AccountRoot = () => {
    return (
        <div>
            <AccountNavbar></AccountNavbar>
            <Outlet></Outlet>
        </div>
    );
};

export default AccountRoot;