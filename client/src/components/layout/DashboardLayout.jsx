import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({
    children,
    menuItems,
    userRole,
    userData,
    headerTitle,
    headerSubtitle,
    headerActions,
    searchPlaceholder,
    noPadding = false
}) => {
    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            <Sidebar menuItems={menuItems} userRole={userRole} />

            <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                <Header
                    title={headerTitle}
                    subtitle={headerSubtitle}
                    actions={headerActions}
                    searchPlaceholder={searchPlaceholder}
                    userData={userData}
                />

                <div className={`flex-1 overflow-y-auto custom-scrollbar ${noPadding ? '' : 'p-8'}`}>
                    <div className={noPadding ? '' : 'max-w-7xl mx-auto'}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
