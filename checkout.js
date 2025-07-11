

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define([], factory); // AMD
    } else if (typeof exports === 'object') {
      module.exports = factory(); // CommonJS
    } else {
      root.launchRabbitlalaPayment = factory(); // Browser global
    }
  }(typeof self !== 'undefined' ? self : this, function () {
    /**
     * Launches the Rabbitlala payment overlay by injecting an iframe, loader, and backdrop into the DOM.

     * Removes any existing Rabbitlala payment elements before creating new ones.
     * Listens for messages from the iframe to handle closing the overlay and hiding the loader.
     *
     * @param {Object} options - Options for launching the payment overlay.
     * @param {string} options.reference - The payment reference to be passed to the Rabbitlala checkout.
     * @param {boolean} [options.isLiveMode=false] - Whether to use the live Rabbitlala checkout URL.
     */
    function launchRabbitlalaPayment({ reference, isLiveMode = false }) {
      const existingIframe = document.getElementById("rabbitlala_iframe");
      if (existingIframe) existingIframe.remove();
  
      const existingLoader = document.getElementById("rabbitlala_loader");
      if (existingLoader) existingLoader.remove();
  
      const existingBackdrop = document.getElementById("rabbitlala_backdrop");
      if (existingBackdrop) existingBackdrop.remove();
  
      const backdrop = document.createElement("div");
      backdrop.id = "rabbitlala_backdrop";
      backdrop.style.position = "fixed";
      backdrop.style.top = "0";
      backdrop.style.left = "0";
      backdrop.style.width = "100%";
      backdrop.style.height = "100%";
      backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      backdrop.style.zIndex = "9997";
      document.body.appendChild(backdrop);
  
      const loader = document.createElement("div");
      loader.id = "rabbitlala_loader";
      loader.style.position = "fixed";
      loader.style.top = "50%";
      loader.style.left = "50%";
      loader.style.transform = "translate(-50%, -50%)";
      loader.style.zIndex = "9998";
      loader.innerHTML = `
        <div style="
          width: 50px;
          height: 50px;
          border: 5px solid #ccc;
          border-top: 5px solid #0061A2;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;
      document.body.appendChild(loader);
  
      const iframe = document.createElement("iframe");
      const baseUrl = isLiveMode
        ? "https://checkout.rabbitlala.ng"
        : "https://checkout.gtcomnet.com";
  
      iframe.src = `${baseUrl}/?reference=${reference}`;
      iframe.id = "rabbitlala_iframe";
      iframe.style.position = "fixed";
      iframe.style.top = "40%";
      iframe.style.left = "50%";
      iframe.style.transform = "translate(-50%, -50%)";
      iframe.style.border = "none";
      iframe.style.width = "100%";
      iframe.style.maxWidth = "100%";
      iframe.style.maxHeight = "100%";
      iframe.style.height = "100%";
      iframe.style.zIndex = "9999";
  
      document.body.appendChild(iframe);
  
      window.addEventListener("message", (event) => {
        if (event.data === "rabbitlala_closed") {
          closeOverlay();
          const iframe = document.getElementById("rabbitlala_iframe");
          if (iframe) iframe.remove();
        }
        if (event.data === "rabbitlala_opened") {
          closeLoader();
        }
      });
  
      /**
       * Removes the overlay backdrop element with the ID "rabbitlala_backdrop" from the DOM if it exists.
       */
      function closeOverlay() {
        const backdrop = document.getElementById("rabbitlala_backdrop");
        if (backdrop) backdrop.remove();
      }
  
      /**
       * Removes the loader element with the ID "rabbitlala_loader" from the DOM if it exists.
       */
      function closeLoader() {
        const loader = document.getElementById("rabbitlala_loader");
        if (loader) loader.remove();
      }
    }
  
    return launchRabbitlalaPayment;
  }));
  