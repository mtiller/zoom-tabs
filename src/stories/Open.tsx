import React from "react";
import { zoomContext, ZoomProvider, SlotContent, Sidebar } from "../../pkg";

export const Open = (props: VideoPageProps) => {
  return (
    <ZoomProvider initiallyOpen="slot0">
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div>
          <VideoPage {...props} />
        </div>
      </div>
    </ZoomProvider>
  );
};

export const Introduction = () => {
  const { controls } = React.useContext(zoomContext);
  return (
    <div style={{ backgroundColor: "white", padding: "1em 1em 1em 1em" }}>
      <h1>Keeping an Eye on Content</h1>
      <div>
        <p>
          One thing about Zoom tabs is that they keep the tab content visible
          the whole time. This is particular interesting when you have any kind
          of animation or streaming video. It means you can see what is going on
          in a tab that isn't selected. It is like having "picture in a picture"
          for your tabs.
        </p>
        <p>
          Obviously, you can overuse this. Having multiple videos playing with
          sound is pretty cacophonous. But if the video is muted or lacks audio,
          using zoom tabs means you can keep an eye on all the content and, when
          something catches your eye, you can quickly bring it back to the
          front.
        </p>
        <p>
          Each <code>ZoomTabs</code> maintains the same aspect ratio across all
          tabs. But that aspect ratio can be custimized. For example, for this
          particular set of nested tabs we are using a 16:9 aspect ratio while
          the root level <code>ZoomTabs</code> are using a 4:3 aspect ratio.
        </p>
        <p>
          To zoom in on a particular "tab", just click on one of the videos
          above and that video will expand when it becomes the selected tab. But
          we can also leverages the <code>useContext</code> hook to tap into and
          control the parent <code>ZoomTabs</code> as shown with the following
          buttons:
        </p>
      </div>
      <div
        style={{ display: "flex", margin: "auto", width: "40em", gap: "5px" }}
      >
        <button onClick={() => controls.expandSlot("slot1")}>
          Kobe's Final Game
        </button>
        <button onClick={() => controls.expandSlot("slot2")}>
          L.A. Lakers vs. Sacremento Kings
        </button>
        <button onClick={() => controls.expandSlot("slot3")}>
          Last 6 Minutes of Bucks vs. Suns
        </button>
        <button onClick={() => controls.expandSlot("slot4")}>
          Michael Jordan's Final Bull's Game
        </button>
      </div>
    </div>
  );
};

export interface VideoPageProps {
  aspectRatio: number;
  width: string;
  gap: number;
}

export const VideoPage = (props: VideoPageProps) => {
  return (
    <div style={{ width: "100%" }}>
      <Sidebar
        width={props.width}
        aspectRatio={props.aspectRatio}
        gap={props.gap}
      >
        <SlotContent>
          <Introduction />
        </SlotContent>
        <SlotContent>
          <iframe
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/Rx2inwUj_F0?mute=1&autoplay=1"}
            title="Kobe's Final Game"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </SlotContent>
        <div style={{ width: "100%", height: "100%" }}>
          <iframe
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/IMfUHpGozrw?mute=1&autoplay=1"}
            frameBorder={0}
            title="L.A. Lakers vs. Sacremento Kings"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div style={{ width: "100%", height: "100%" }}>
          <iframe
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/7PR9jEmGzjM?mute=1&autoplay=1"}
            frameBorder={0}
            title="Last 6 Minutes of Bucks vs. Suns"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div style={{ width: "100%", height: "100%" }}>
          <iframe
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/530z-_yjdlU?mute=1&autoplay=1"}
            frameBorder={0}
            title="Michael Jordan's Final Bull's Game"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </Sidebar>
    </div>
  );
};
