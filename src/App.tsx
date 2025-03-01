import { ZoomProvider, ZoomOutlet, ZoomSlot } from "./lib";

const aspectRatio = "6/3";
function App() {
  return (
    <ZoomProvider>
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
            width: "29vw",
            marginRight: "2vw",
            marginLeft: "2vw",
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
            <ZoomSlot slot="red">
              <span>First Box</span>
            </ZoomSlot>
          </div>
          <div
            style={{
              flexGrow: 1,
              aspectRatio: aspectRatio,
              boxSizing: "border-box",
            }}
          >
            <ZoomSlot slot="green">
              <span>Second Box</span>
            </ZoomSlot>
          </div>
        </div>
        <div
          style={{
            flexGrow: 1,
            aspectRatio: aspectRatio,
            boxSizing: "border-box",
          }}
        >
          <ZoomOutlet />
        </div>
      </div>
    </ZoomProvider>
  );
}

export default App;
