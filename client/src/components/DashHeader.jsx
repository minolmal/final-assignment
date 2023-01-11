import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSendLogoutMutation } from "../features/auth/authApiSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileCirclePlus,
//   faFilePen,
//   faRightFromBracket,
//   faUserGear,
//   faUserPlus,
// } from "@fortawesome/free-solid-svg-icons";
// import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  // const { isManager, isAdmin } = useAuth();
  // const navigate = useNavigate();
  // const { pathname } = useLocation();

  // const [sendLogout, { isLoading, isSuccess, isError, error }] =
  //   useSendLogoutMutation();

  // useEffect(() => {
  //   if (isSuccess) navigate("/");
  // }, [isSuccess, navigate]);

  // const onNewNoteClicked = () => navigate("/dash/notes/new");
  // const onNewUserClicked = () => navigate("/dash/users/new");
  // const onNoteClicked = () => navigate("/dash/notes");
  // const onUserClicked = () => navigate("/dash/users");

  // let dashClass = null;
  // if (
  //   !DASH_REGEX.test(pathname) &&
  //   !NOTES_REGEX.test(pathname) &&
  //   !USERS_REGEX.test(pathname)
  // ) {
  //   dashClass = "dash-header__container--small";
  // }

  // let newNoteButton = null;
  // if (NOTES_REGEX.test(pathname)) {
  //   newNoteButton = (
  //     <button
  //       className="icon-button"
  //       title="New Note"
  //       onClick={onNewNoteClicked}>
  //       <FontAwesomeIcon icon={faFileCirclePlus} />
  //     </button>
  //   );
  // }

  // let newUserButton = null;
  // if (USERS_REGEX.test(pathname)) {
  //   newUserButton = (
  //     <button
  //       className="icon-button"
  //       title="New User"
  //       onClick={onNewUserClicked}>
  //       <FontAwesomeIcon icon={faUserPlus} />
  //     </button>
  //   );
  // }

  // let noteButton = null;
  // if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
  //   noteButton = (
  //     <button className="icon-button" title="Notes" onClick={onNoteClicked}>
  //       <FontAwesomeIcon icon={faFilePen} />
  //     </button>
  //   );
  // }

  // let userButton = null;
  // if (isManager || isAdmin) {
  //   if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
  //     userButton = (
  //       <button className="icon-button" title="Users" onClick={onUserClicked}>
  //         <FontAwesomeIcon icon={faUserGear} />
  //       </button>
  //     );
  //   }
  // }

  // const logoutButton = (
  //   <button className="icon-button" title="Logout" onClick={sendLogout}>
  //     <FontAwesomeIcon icon={faRightFromBracket} />
  //   </button>
  // );

  // const errClass = isError ? "errmsg" : "offscreen";

  // let buttonContent;
  // if (isLoading) {
  //   buttonContent = <p>Logging Out...</p>;
  // } else {
  //   buttonContent = (
  //     <>
  //       {newNoteButton}
  //       {newUserButton}
  //       {noteButton}
  //       {userButton}
  //       {logoutButton}
  //     </>
  //   );
  // }

  const content = (
    <>
      {/* <p className={errClass}>{error?.data?.message}</p> */}

      <header className="dash-header">
        {/* ${dashClass} */}
        <div className={`dash-header__container `}>
          <Link to="/dash">
            <h1 className="dash-header__title">ABC Institute</h1>
          </Link>
          {/* {buttonContent} */}
          <nav className="dash-header__nav"></nav>
        </div>
      </header>
    </>
  );
  return content;
};

export default DashHeader;
