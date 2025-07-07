(function (global) {
    function launchFlutterPayment({ reference, isLiveMode = false }) {
      const existingIframe = document.getElementById("flutter-sdk-iframe");
      if (existingIframe) existingIframe.remove();
  
      const iframe = document.createElement("iframe");
      iframe.src = `https://checkout.gtcomnet.com/?reference=${reference}&is_live_mode=${isLiveMode}`;
      iframe.id = "flutter-sdk-iframe";
  
      // Optional styling
      iframe.style.position = "fixed";
      iframe.style.top = "40%";
      iframe.style.left = "50%";
      iframe.style.transform = "translate(-50%, -50%)";
      iframe.style.border = "none";
      iframe.style.width = "90%";
      iframe.style.maxWidth = "500px";
      iframe.style.height = "600px";
      iframe.style.zIndex = "9999";
  
      document.body.appendChild(iframe);
  
      // Handle SDK close message from Flutter
      window.addEventListener("message", (event) => {
        if (event.data === "sdk_closed") {
          const iframe = document.getElementById("flutter-sdk-iframe");
          if (iframe) iframe.remove();
        }
      });
    }
  
    // Expose globally
    global.launchFlutterPayment = launchFlutterPayment;
  })(window);
 