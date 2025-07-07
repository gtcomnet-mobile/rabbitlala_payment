(function (global) {
  function launchFlutterPayment({ reference, isLiveMode = false }) {
    const existingIframe = document.getElementById("flutter-sdk-iframe");
    if (existingIframe) existingIframe.remove();

    const existingLoader = document.getElementById("flutter-sdk-loader");
    if (existingLoader) existingLoader.remove();

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
        border-top: 5px solid #007bff;
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
    iframe.style.width = "90%";
    iframe.style.maxWidth = "500px";
    iframe.style.height = "600px";
    iframe.style.zIndex = "9999";

    // iframe.onload = () => {
    //   const loader = document.getElementById("flutter-sdk-loader");
    //   // delay removing the loader to ensure the iframe is fully loaded
    //   setTimeout(() => {
    //     if (loader) loader.remove();
    //   }, 2000); // Adjust delay as needed
    // };
      // if (loader) loader.remove();
    // };

    document.body.appendChild(iframe);

    // Handle SDK close
    window.addEventListener("message", (event) => {
      if (event.data === "sdk_closed") {
        const iframe = document.getElementById("flutter-sdk-iframe");
        if (iframe) iframe.remove();
      }
      if (event.data === "sdk_opened") {
        const loader = document.getElementById("flutter-sdk-loader");
        // delay removing the loader to ensure the iframe is fully loaded
        setTimeout(() => {
          if (loader) loader.remove();
        }, 500); // Adjust delay as needed
      }
    });
  }

  // Expose globally
  global.launchFlutterPayment = launchFlutterPayment;
})(window);
