import React, { className } from "react";
import Navbar from "./Navbar";
import Welcome from "./Welcome";

export default function About(props) {
  return (
    <main>
      <Welcome />
      <section className='logged-out-view' >
        <div>
          <div>
            <h4>You have found the About page 👏</h4>
          </div>
          <div>
            <h5>Purchase hub is a full stack web app made by Muhammad Zwink</h5>
            <h5>You can find more information and the source code for this project on <a href="https://github.com/mdzwink/my-purchases/tree/main">Github</a></h5>
            <h5>Have an amazing day!</h5>
          </div>
        </div>
      </section>
    </main>
  );
}