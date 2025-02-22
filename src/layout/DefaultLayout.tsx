
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import DefaultHeader from '../components/Defaultheader';

const DefaultLayout = () => {
    // const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark dark">
      {/* <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"> */}
        {/* <DefaultHeader sidebarOpen={false}  /> */}
        <main>
          <div className="">
            <Outlet/>
          </div>
        </main>
      </div>
  //   </div>
  // </div>
  );
};

export default DefaultLayout;
