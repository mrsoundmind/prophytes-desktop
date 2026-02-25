const { default: Swal } = require("sweetalert2");

export const ErrorAlert = (
  message = "Something went wrong",
  duration = 4000
) => {
  Swal.fire({
    position: "center",
    title: message,
    html: `
      <div class="flex justify-center mb-2">
        <div class="p-2 border-2 border-secondary rounded-full">
          <svg class="text-black-600 w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
