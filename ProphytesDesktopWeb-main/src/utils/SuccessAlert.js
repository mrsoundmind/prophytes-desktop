import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store"; // ✅ make sure path is correct
import ConnectionButton from "@/components/ConnectionButton";

export const SuccessAlert = (message = "Success!", duration = 3000) => {
  Swal.fire({
    position: "center",
    title: message,
    html: `
      <div class="flex justify-center mb-2">
        <div class="p-2 border-2 border-secondary rounded-full">
          <svg class="text-black w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    `,
    showConfirmButton: true,
    timer: duration,
    customClass: {
      popup: "z-[9999]",
      title: "text-black text-xl font-bold font-sans font-montserrat",
      confirmButton:
        "bg-black text-white px-4 py-2 rounded hover:bg-gray-800 hover:text-white",
    },
    didOpen: () => {
      const container = document.querySelector(".swal2-container");
      if (container) {
        container.style.zIndex = "9999";
      }
    },
  });
};

let root = null; // to reuse and cleanup React root

export const ConnectionAlert = (
  message,
  notificationId,
  requestFrom,
  duration = 5000
) => {
  Swal.fire({
    position: "center",
    title: "New Connection Request",
    html: `
      <div class="flex flex-col items-center gap-4">
        <div class="p-2 border-secondary rounded-full">
          ${message}
        </div>
        <div id="connection-button"></div>
      </div>
    `,
    showConfirmButton: false, // 🔥 removes default "OK" button
    timer: duration, // auto-close if needed
    customClass: {
      popup: "z-[9999]",
      title: "text-black text-xl font-bold font-sans font-montserrat",
    },
    didOpen: () => {
      const container = document.querySelector(".swal2-container");
      if (container) container.style.zIndex = "9999";

      const mountPoint = document.getElementById("connection-button");
      if (mountPoint) {
        // cleanup any old root before creating a new one
        if (root) {
          root.unmount();
          root = null;
        }

        root = createRoot(mountPoint);
        root.render(
          <Provider store={store}>
            <ConnectionButton
              notificationId={notificationId}
              requestFrom={requestFrom}
              className="hover:text-black"
            />
          </Provider>
        );
      }
    },
    willClose: () => {
      // cleanup React root when SweetAlert closes
      if (root) {
        root.unmount();
        root = null;
      }
    },
  });
};
