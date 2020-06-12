// build navr bar here and import it into hom.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import { userActions } from '../../actions/userActions';
import './NavBarStyle.scss';

const NavBar: React.FC = () => {
  // // redux store is connected here
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.isLoggedIn);

  // // constantly checks to see if ther user is loggedin
  // useEffect(() => {
  //   // if the user is logged in dispatch login action.
  //   if (
  //     document.cookie.split(';').filter((item) => {
  //       return item.includes('isLoggedIn=');
  //     }).length
  //   ) {
  //     dispatch(userActions.login());
  //   }
  //   // else {
  //   //   dispatch(userActions.logout());
  //   // }
  // });

  // // dispatches logout action if the user wants to logout
  // const handleClick = () => {
  //   dispatch(userActions.logout());
  // };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="header_content d-flex flex-row align-items-center justify-content-start">
              <div className="logo">
                <Link to="/">
                  {/* <img src="images/logo.png" alt></img> */}
                  <div className="nav_title">
                    <FontAwesomeIcon color="white" icon={faBuilding} />
                    <span> Rate My Landlord </span>
                  </div>
                </Link>
              </div>
              <nav className="phone_num ml-auto">
                <Link className="phone_num_inner" to="/">
                  <span> Home </span>
                </Link>
                {/* {user ? ( 
                  <Link className="phone_num_inner" onClick={handleClick} to="/">
                    <span> Logout </span>
                  </Link>
                ) : (
                  <Link className="phone_num_inner" to="/login">
                    <span> Login </span>
                  </Link>
                )}
                <Link className="phone_num_inner" to="/signup">
                  {user ? <span /> : <span> Signup </span>}
                </Link> */}
              </nav>
              {/* <div className="hamburger ml-auto">
                <FontAwesomeIcon color="white" icon={faBars} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
