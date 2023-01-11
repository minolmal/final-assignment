import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const Test = () => {
  

  const content = (
    <section className="public">
      <header>
        <h1>Test Page</h1>
      </header>

      <main className="public__main">
        
      </main>

      <footer>
        <Link to="/">Back</Link>
      </footer>
    </section>
  );
  return content;
};

export default Test;
