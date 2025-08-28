import Comments from "./features/comments/Comments";

function App() {
  const currentUser = "user-1"; //demo for testing
  return (
    <>
      <Comments currentUser={currentUser} />
    </>
  );
}

export default App;
