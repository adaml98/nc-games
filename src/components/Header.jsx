export default function Header({ user }) {
  return (
    <header>
      <h1>NC Games</h1>
      <p>Logged in as: {user}</p>
    </header>
  );
}
