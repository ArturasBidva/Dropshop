import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {SidebarData} from './SidebarData';
import "../../navbar.css"
import {IconContext} from 'react-icons';
import {Badge, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../utils/language/LanguageSwitcher";
import {useDispatch, useSelector} from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {removeUser} from "../../store/slices/user/userSlice";

function Navbar() {
    const cart = useSelector(state => state.cart);
    const [sidebar, setSidebar] = useState(false);
    const user = useSelector(state => state.user.user);
    const totalItems = cart.reduce((sum, {quantity}) => sum + quantity, 0);
    const {t} = useTranslation('sidebar');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showSidebar = () => setSidebar(!sidebar);
    const onLogout = () => {
        dispatch(removeUser());
        navigate("/login");
    }

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                    <div className="nav-menu-content">
                        {user && <>
                            <Button color="inherit" component={NavLink} to="/cart">
                                <Badge badgeContent={totalItems} color="primary">
                                    <ShoppingCartIcon/>
                                </Badge>
                            </Button>
                            <Button color="inherit" component={NavLink} to="/">{t('home')}</Button>
                            <Button color="inherit" component={NavLink} to="/profile">{t('profile')}</Button>
                            <Button color="inherit" onClick={onLogout}>{t('logout')}</Button>
                        </>}{ user?.roles.includes("ADMIN") &&
                        <Button color="inherit" component={NavLink} to="/orders">{t('orders')}</Button>
                    }{!user &&
                        < >

                            <Button color="inherit" component={NavLink} to="/login">{t('login')}</Button>
                            <Button color="inherit" component={NavLink} to="/register">{t('register')}</Button>
                        </>
                    }
                        <LanguageSwitcher/>
                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <div className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose/>
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.link}>
                                        {item.icon}
                                        <span>{t(item.title.text)}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;