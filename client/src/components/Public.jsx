import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">ABC Institute!</span>
        </h1>
      </header>

      <main className="public__main">
        <p>
          This is a welcome page. Click Dashboard to access Database.
        </p>
        <address className="public__addr">
          ABC Institute <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555)-555-5555</a>
        </address>
        <br />
        {/* <Link to='/test'> {">"} Test page </Link> */}
      </main>
      <footer>
        <Link to="/dash">Dashboard</Link>
      </footer>
    </section>
  );

  return content;
};

export default Public;
