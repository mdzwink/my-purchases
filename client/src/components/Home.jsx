import Welcome from "./Welcome";

export default function Home(props) {
  const {darkMode} = props;
  return (
    <>
      <main>
        <div className="welcome-fade-in"></div>
        <Welcome />
      </main>
    </>
  );
}