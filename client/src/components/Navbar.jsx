import Button from "./Button";


export default function Navbar() {
  
  return (
      <ul className="navbar">
        <li><h2>Purchases Hub</h2></li>
        <div className="menu-items">
          <li><Button>Add a Purchase</Button></li>
          <li><Button>About</Button></li>
          <li><Button>Logged in as:</Button></li>
          <li><Button>Sign-up</Button></li>
          <li><Button>Sign-in</Button></li>
          <li><Button>Sign-out</Button></li>
        </div>
      </ul>
  )
}