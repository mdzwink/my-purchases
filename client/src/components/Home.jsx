import React, { className } from 'react';
import Navbar from "./Navbar";
import Welcome from "./Welcome";

export default function Home() {

  return (
    <>
      <main>
        <Welcome />
        <div className="logged-out-view" >
          <h1>Home page</h1>
          <p>This section explanes the features of the app and points to login and register</p>
        </div>
      </main>
    </>
  );
}