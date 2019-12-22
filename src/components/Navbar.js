import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge } from 'react-materialize';
import { useSelector } from 'react-redux';
import Logo from '../product-img/logo_light.png';

const Navbar = () => {
    const addedItems = useSelector(state => state.addedItems);
    return (
        <nav className="nav-wrapper">
            <div className="container">
                <Link to="/" className="brand-logo"><img src={Logo} height="25" alt="Logo" /></Link>
                <ul className="right">
                    <li><NavLink exact={true} activeClassName="active" to="/">Products</NavLink></li>
                    <li><NavLink activeClassName="active" to="/cart">My cart</NavLink></li>
                    <li><Link to="/cart" className="cart-icon"><i className="material-icons">shopping_cart</i> 
                    {(addedItems.length) ? <Badge>{addedItems.length}</Badge> : <Badge>0</Badge>}
                    </Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;