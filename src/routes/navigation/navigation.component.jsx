import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import  { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo"></CrwnLogo>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {/* Se utente loggato, mostro link SIGN OUT, altrimenti SIGN IN */}
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>
          ) : (
            <NavLink className="nav-link" to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon></CartIcon>
        </NavLinks>
        {isCartOpen && <CartDropdown></CartDropdown>}
      </NavigationContainer>
      <Outlet></Outlet>
    </Fragment>
  )
}

export default Navigation;