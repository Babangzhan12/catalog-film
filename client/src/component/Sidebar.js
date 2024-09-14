import React from "react";
import { Link } from "react-router-dom";
import {Menu} from "primereact/menu"
import { useAuth } from "../auth/useAuth";

const Sidebar = () => {
    const {signout} = useAuth();

    const items = [
        {
            label: "Dashboard",
            icon: "pi pi-th-large",
            template: (item,options) => {
                return (
                    <Link to="/admin/dashboard" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Film",
            icon: "pi pi-video",
            template: (item,options) => {
                return (
                    <Link to="/admin/film" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Pengguna",
            icon: "pi pi-users",
            template: (item,options) => {
                return (
                    <Link to="/admin/pengguna" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Sign Out",
            icon: "pi pi-sign-out",
            command: () => signout()
        }
    ]

    return (
         <div className="sidebar">
            <h3>Sidebar</h3>
            <hr className="custom-thin"/>
            <Menu model={items} />
        </div>
    )
}

export default Sidebar;