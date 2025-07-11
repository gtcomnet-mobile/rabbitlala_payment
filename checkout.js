(function (global) {
  function launchRabbitlalaPayment({ reference, isLiveMode = false }) {
    const existingIframe = document.getElementById("rabbitlala_iframe");
    if (existingIframe) existingIframe.remove();

    const existingLoader = document.getElementById("rabbitlala_loader");
    if (existingLoader) existingLoader.remove();

    const existingBackdrop = document.getElementById("rabbitlala_backdrop");
    if (existingBackdrop) existingBackdrop.remove();

    // Create backdrop
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

    // Create loader
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

    // Create iframe
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

    // Handle SDK close or ready messages
    window.addEventListener("message", (event) => {
      if (event.data === "rabbitlala_closed") {
        closeOverlay();
        // window.parent.postMessage("rabbitlala_closed", "*");
        const iframe = document.getElementById("rabbitlala_iframe");
        if (iframe) iframe.remove();
      }
      if (event.data === "rabbitlala_opened") {
        // window.parent.postMessage("rabbitlala_opened", "*");
        closeLoader();    
        }
    });

    function closeOverlay() {
      const backdrop = document.getElementById("rabbitlala_backdrop");
      if (backdrop) backdrop.remove();
    }
    function closeLoader() {
      const loader = document.getElementById("rabbitlala_loader");
      if (loader) loader.remove();
    }
  }

  global.launchRabbitlalaPayment = launchRabbitlalaPayment;
})(window);
