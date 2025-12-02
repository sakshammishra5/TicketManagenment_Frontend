import { NavLink, Outlet } from 'react-router'
import "./DashboardLayout.css"
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { RiRobot3Line } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";


const DashboardLayout = () => {
    return (
        <>
            <div className='dashbaord-container'>
                <div className='sidebar-wrapper'>
                    <aside className='sidebar'>
                        <NavLink to="/" className="link"><img src="./logo.svg" alt="" /></NavLink>
                        <NavLink style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} to="/dashboard" className="link">
                            <IoHomeOutline /> Dashboard
                        </NavLink>
                        <NavLink to="/dashboard/chat/:chatId" className="link"><MdOutlineChat /> </NavLink>
                        <NavLink to="/dashboard/stats" className="link"><IoStatsChart /></NavLink>
                        <NavLink to="/dashboard/chatsetting" className="link"><RiRobot3Line /></NavLink>
                        <NavLink to="/dashboard/team" className="link"><MdGroups /></NavLink>
                        <NavLink to="/dashboard/settings" className="link"><IoSettingsOutline /></NavLink>

                    </aside>
                </div>

                {/* Right Main Panel */}
                <main className='content-area'>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default DashboardLayout
