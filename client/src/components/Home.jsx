import Login from "./Login";
import Register from "./Register";
import Welcome from "./Welcome";

export default function Home(props) {
  const { setUser, loginRegister, setLoginRegister} = props;

  // const navigate = useNavigate();
  // if (user) {
  //   navigate('/dashboard')
  // }

  return (
    <>
      <main>
        <div className="home-container">
          <div className="welcome-fade-in"></div>
          <div className="home-morph">
            {loginRegister === 'login' ? 
              <Login setUser={() => setUser} loginRegister={loginRegister} setLoginRegister={setLoginRegister} /> 
            : 
              loginRegister === 'register' ?
                <Register setUser={() => setUser} loginRegister={loginRegister} setLoginRegister={setLoginRegister}/>
              : 
                <Welcome />
            }
          </div>
        </div>
      </main>
    </>
  );
}