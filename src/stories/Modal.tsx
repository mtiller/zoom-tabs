export interface ModalProperties {}

export const Modal = (_props: ModalProperties) => {
  return (
    <div>
      <div>
        <h1>Modal Outlet</h1>
        <p>
          As mentioned previously, this library works with any layout. In this
          case, we'll create a layout where all the slots are just laid out in a
          grid on the page. But the "Outlet" will be a model <code>div</code>{" "}
          that occludes all the slots (until closed).
        </p>
        <p>
          Below are a collection of slots. For these cases, we will use an{" "}
          <code>img</code> as the overlay for each slot but that overlay will
          fade away when opened.
        </p>
      </div>
    </div>
  );
};
