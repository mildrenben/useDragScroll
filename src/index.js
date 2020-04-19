import { useState, useEffect, useCallback } from 'react';

function useSwipeScroll({
  sliderRef,
  reliants = [],
  momentumVelocity = 0.9
}) {
  const [hasSwiped, setHasSwiped] = useState(false)

  const init = useCallback(() => {
    const slider = sliderRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      cancelMomentumTracking();
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
      beginMomentumTracking();
      setTimeout(() => setHasSwiped(false), 0)
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      let prevScrollLeft = slider.scrollLeft;
      slider.scrollLeft = scrollLeft - walk;
      velX = slider.scrollLeft - prevScrollLeft;
      if (slider.scrollLeft - prevScrollLeft && !hasSwiped) {
        setHasSwiped(true)
      }
    });

    // Momentum 
    let velX = 0;
    let momentumID;

    slider.addEventListener('wheel', (e) => {
      cancelMomentumTracking();
    });

    function beginMomentumTracking() {
      cancelMomentumTracking();
      momentumID = requestAnimationFrame(momentumLoop);
    }
    function cancelMomentumTracking() {
      cancelAnimationFrame(momentumID);
    }
    function momentumLoop() {
      slider.scrollLeft += velX;
      velX *= momentumVelocity;
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    }
  })

  useEffect(() => {
    init();
  }, [...reliants])

  return {
    hasSwiped,
  }
}

export default useSwipeScroll