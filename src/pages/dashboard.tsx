'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layouts/dashboardLayout';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout
      tabName="Dashboard"
      tabDescription= "Diagnostic Dashboard"
    >
    </DashboardLayout>
  );
};

export default Dashboard;
