(function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.createElement("canvas");
  canvas.id = "starfield";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d", { alpha: false });
  const nebula = new Image();
  nebula.src = "assets/css/wallpaperflare.com_wallpaper.jpg";

  let width = 0;
  let height = 0;
  let time = 0;
  let frame = 0;
  let ready = false;

  nebula.onload = function () {
    ready = true;
    if (reducedMotion) {
      paint();
    }
  };

  function drawNebula() {
    const zoom = reducedMotion ? 1.08 : 1.14;
    const imageRatio = nebula.width / nebula.height;
    const canvasRatio = width / height;
    let drawWidth;
    let drawHeight;

    if (imageRatio > canvasRatio) {
      drawHeight = height * zoom;
      drawWidth = drawHeight * imageRatio;
    } else {
      drawWidth = width * zoom;
      drawHeight = drawWidth / imageRatio;
    }

    const driftX = reducedMotion ? 0 : Math.sin(time * 0.00003) * (drawWidth - width) * 0.42;
    const driftY = reducedMotion ? 0 : Math.cos(time * 0.000022) * (drawHeight - height) * 0.36;
    const x = (width - drawWidth) / 2 + driftX;
    const y = (height - drawHeight) / 2 + driftY;
    ctx.drawImage(nebula, x, y, drawWidth, drawHeight);

    ctx.fillStyle = "rgba(6, 8, 14, 0.22)";
    ctx.fillRect(0, 0, width, height);
  }

  function paint() {
    ctx.fillStyle = "#06080e";
    ctx.fillRect(0, 0, width, height);

    if (ready) {
      drawNebula();
    }

    if (!reducedMotion) {
      time += 16;
      frame = window.requestAnimationFrame(paint);
    }
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resize);
  resize();
  paint();

  window.addEventListener("beforeunload", function () {
    window.cancelAnimationFrame(frame);
  });
})();
