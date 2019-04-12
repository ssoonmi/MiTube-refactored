function slider({ ref, onMouseDown }) {
  ref.addEventListener('mousedown', function mouseDownHandler(e) {
    let wasPaused = (videoRef.paused || videoRef.ended);
    togglePlayPause(e, 'pause');
    setDrag(true);

    function dragProgress(e) {
      e.preventDefault();
      const bar = ref.getBoundingClientRect();
      const x = e.clientX - bar.left; //x position within the element.
      let ratio = x / ref.offsetWidth;
      if (ratio >= 1) ratio = 1;
      if (ratio < 0) ratio = 0;
      setProgress(ratio);
    }

    document.addEventListener('mousemove', dragProgress, false);

    document.addEventListener('mouseup', function mouseUpHandler(e) {
      const bar = ref.getBoundingClientRect();
      const x = e.clientX - bar.left; //x position within the element.
      let ratio = x / ref.offsetWidth;
      if (ratio >= 1) {
        ratio = 1;
        wasPaused = 'paused';
      }
      if (ratio < 0) ratio = 0;
      videoRef.currentTime = ratio * videoRef.duration;
      document.removeEventListener('mousemove', dragProgress, false);
      document.removeEventListener('mouseup', mouseUpHandler, false);
      togglePlayPause(e, wasPaused ? 'pause' : 'play');
      setDrag(false);
    }, false);
  });
  return (() => {
    ref.removeEventListener('mousedown', mouseDownHandler);
  });
}

export default slider;