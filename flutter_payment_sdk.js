(function (global) {
  function launchFlutterPayment({ reference, isLiveMode = false }) {
    const existingIframe = document.getElementById("flutter-sdk-iframe");
    if (existingIframe) existingIframe.remove();

    const existingLoader = document.getElementById("flutter-sdk-loader");
    if (existingLoader) existingLoader.remove();

    const existingBackdrop = document.getElementById("flutter-sdk-backdrop");
    if (existingBackdrop) existingBackdrop.remove();

    // Create backdrop
    const backdrop = document.createElement("div");
    backdrop.id = "flutter-sdk-backdrop";
    backdrop.style.position = "fixed";
    backdrop.style.top = "0";
    backdrop.style.left = "0";
    backdrop.style.width = "100%";
    backdrop.style.height = "100%";
    backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    backdrop.style.zIndex = "9997";
    document.body.appendChild(backdrop);

    // Create loader
    const loader = document.createElement("div");
    loader.id = "flutter-sdk-loader";
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

    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.src = `https://checkout.gtcomnet.com/?reference=${reference}&is_live_mode=${isLiveMode}`;
    iframe.id = "flutter-sdk-iframe";

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

    // Hide loader on iframe load
    // iframe.onload = () => {
    //   closeOverlay();
    // };

    document.body.appendChild(iframe);

    // Handle SDK close or ready messages
    window.addEventListener("message", (event) => {
      if (event.data === "sdk_closed") {
        closeOverlay();
        const iframe = document.getElementById("flutter-sdk-iframe");
        if (iframe) iframe.remove();
      }
      if (event.data === "sdk_opened") {
        closeOverlay();
      }
    });

    function closeOverlay() {
      const loader = document.getElementById("flutter-sdk-loader");
      if (loader) loader.remove();
      const backdrop = document.getElementById("flutter-sdk-backdrop");
      if (backdrop) backdrop.remove();
    }
  }

  global.launchFlutterPayment = launchFlutterPayment;
})(window);
