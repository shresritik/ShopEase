import StartToastifyInstance from "toastify-js";

export const toast = (message: string, status: string) => {
  StartToastifyInstance({
    text: message,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    offset: { x: 0, y: 100 },
    style: {
      background: status == "danger" ? "red" : "green",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};
