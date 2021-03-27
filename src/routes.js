import React from 'react'
import Account from './components/Account/Account';
import AddUser from './components/AddUser/AddUser';
import LogIn from './components/LogIn/LogIn';
import CustomerListView from './components/LogsData/Logs';
import Machines from './components/Machines/Machines';

import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import MainLayout from './layouts/MainLayout/MainLayout';
import { Navigate } from 'react-router-dom';
import { Reports } from './Pages/Reports/Reports';
import { Sidebar } from 'react-feather';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account/> },
      { path: 'reports', element: <Reports/> },
      { path: 'reports/call-logs', element: <CustomerListView/> },
      { path: 'machine-data', element: <Machines/> }
    ]
  },
  {
    path: '',
    element: <MainLayout />,
    children: [
      { path: '', element: <LogIn /> },
      { path: 'add-user', element: <AddUser /> },
     
      
    ]
  }
];

export default routes;


