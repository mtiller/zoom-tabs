const aspectRatio = "6/3";
function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "33vw",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            aspectRatio: aspectRatio,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid red",
              boxSizing: "border-box",
            }}
          >
            First Box
          </div>
        </div>
        <div
          style={{
            flexGrow: 1,
            aspectRatio: aspectRatio,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid green",
              boxSizing: "border-box",
            }}
          >
            Second Box
          </div>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
          aspectRatio: aspectRatio,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid blue",
            boxSizing: "border-box",
          }}
        >
          The rest
        </div>
      </div>
    </div>
  );
}

export default App;
