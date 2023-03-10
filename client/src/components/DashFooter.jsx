import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button className="dash-footer__button icon-button" title="Home" onClick={onGoHomeClicked}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      {/* TODO: implement auth and get Users and status*/}
      <p>Current User: Joe Johns</p>
      <p>Status: Admin</p>
    </footer>
  );
  return content;
};

export default DashFooter;
