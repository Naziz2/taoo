import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export type CanvasWheelHandle = {
  spinTo: (label: string) => void;
};

export default forwardRef(function CanvasWheel(
  {
    size,
    labels,
    onSpinComplete,
    pointsLabel = 'pts',
  }: { size: number; labels: string[]; onSpinComplete?: (label: string) => void; pointsLabel?: string },
  ref
) {
  const webRef = useRef<WebView>(null);

  useImperativeHandle(ref, () => ({
    spinTo: (label: string) => {
      const js = `window.spinToTarget && window.spinToTarget(${JSON.stringify(label)}); true;`;
      webRef.current?.injectJavaScript(js);
    },
  }));

  const html = useMemo(() => {
    const labelsJson = JSON.stringify(labels.map((l) => ({ label: l })));
    const pts = JSON.stringify(pointsLabel);
    // Inline HTML with user's JS/CSS adapted to postMessage and dynamic sizing
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; }
  #wheelOfFortune { display: inline-block; position: relative; overflow: hidden; }
  #wheel { display: block; border-radius: 50%; }
  /* no internal spin button; RN provides the center button */
</style>
</head>
<body>
  <div id="wheelOfFortune">
    <canvas id="wheel"></canvas>
  </div>
<script>
(function(){
  const sectors = ${labelsJson};
  const canvas = document.getElementById('wheel');
  const ctx = canvas.getContext('2d');
  const size = ${size};
  const POINTS_LABEL = ${pts};
  canvas.width = size; canvas.height = size;

  var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#F1DF94');
  gradient.addColorStop(0.5, '#9A7E41');
  gradient.addColorStop(1, '#66430F');
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);

  const dia = canvas.width; const rad = dia / 2; const TAU = 2 * Math.PI; const arc = TAU / sectors.length;
  let angVel = 0, ang = 0; const friction = 0.991;

  function drawSector(sector, i) {
    const a = arc * i;
    ctx.save(); ctx.beginPath();
    // Alternate orange hues to match design
    ctx.fillStyle = (i % 2) ? '#F29C38' : '#F6C04A';
    ctx.moveTo(rad, rad); ctx.arc(rad, rad, rad, a, a + arc); ctx.lineTo(rad, rad); ctx.fill();
    ctx.translate(rad, rad); ctx.rotate(a + arc / 2);
    // Improve text clarity: white stroke halo + dark fill
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.strokeText(POINTS_LABEL + ' ' + sector.label, rad - 20, 0);
    ctx.fillStyle = '#1F2937';
    ctx.fillText(POINTS_LABEL + ' ' + sector.label, rad - 20, 0);
    ctx.restore();
  }

  function renderAll(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Background gradient
    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#F1DF94');
    gradient.addColorStop(0.5, '#9A7E41');
    gradient.addColorStop(1, '#66430F');
    ctx.fillStyle = gradient; ctx.fillRect(0,0,canvas.width,canvas.height);
    sectors.forEach(drawSector);
  }

  function rotate() { ctx.canvas.style.transform = 'rotate(' + (ang - Math.PI / 2) + 'rad)'; }

  function frame() {
    if (!angVel) return;
    angVel *= friction; if (angVel < 0.002) angVel = 0;
    ang += angVel; ang %= TAU; rotate(); requestAnimationFrame(frame);
  }

  function easeOutCubic(t, b, c, d) { t /= d; t--; return c * (t*t*t + 1) + b; }

  function spinToTarget(targetLabel) {
    const targetIndex = sectors.findIndex(s => s.label === targetLabel);
    if (targetIndex === -1) return;
    // Align chosen segment to the BOTTOM (add 180° offset vs top)
    const targetAngle = (sectors.length - targetIndex - 0.5) * arc + Math.PI;
    const finalAngle = 8 * TAU + targetAngle; // 8 turns
    let frameCount = 0; const totalFrames = 240; // ~4s at 60fps
    function animate(){
      frameCount++; ang = easeOutCubic(frameCount, 0, finalAngle, totalFrames); rotate();
      if (frameCount < totalFrames) requestAnimationFrame(animate); else {
        // Notify RN that spin finished
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'done', label: targetLabel }));
        }
      }
    }
    requestAnimationFrame(animate);
  }

  // Expose API
  window.spinToTarget = spinToTarget;

  renderAll(); rotate();

  // No internal click; RN handles spinning via injected JS
})();
</script>
</body>
</html>`;
  }, [labels, size]);

  return (
    <View style={{ width: size, height: size }}>
      <WebView
        ref={webRef}
        originWhitelist={["*"]}
        source={{ html }}
        style={{ width: size, height: size, backgroundColor: 'transparent' }}
        onMessage={(e) => {
          try {
            const data = JSON.parse(e.nativeEvent.data);
            if (data?.type === 'done' && onSpinComplete) onSpinComplete(data.label);
          } catch {}
        }}
      />
    </View>
  );
})
