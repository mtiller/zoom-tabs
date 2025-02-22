import { ZoomProvider } from "./context";
import { ZoomOutlet } from "./outlet";
import { ZoomSlot } from "./slot";

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
            <ZoomSlot id="red">
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
            <ZoomSlot id="green">
              <p>Second Box</p>
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
