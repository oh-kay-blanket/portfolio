(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.movingShadow = factory());
}(this, (function () { 'use strict';

  const getTouchPos = event => {
    var eventDoc, doc, body;



    if (event.touches) {

      // Use event.pageX / event.pageY
      const touchPos = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      };
      return touchPos;
    } else {
      event = event || window.event; // IE-ism

      // If pageX/Y aren't available and clientX/Y are,
      // calculate pageX/Y - logic taken from jQuery.
      // (This is to support old IE)
      if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
      }

      // Use event.pageX / event.pageY
      const touchPos = {
        x: event.pageX,
        y: event.pageY
      };
      return touchPos;
    }
  };

  const getElePos = element => {
    var rect = element.getBoundingClientRect();
    rect.centerX = Math.round(rect.x + (rect.width/2));
    rect.centerY = Math.round(rect.y + (rect.height/2));

    return rect;
  };

  const makeShadow = (element, xDiff, yDiff, farthestPoint, settings) => {
    const { angle, diffusion, color, fixedShadow } = settings;

    let shadowArr = [];

    // If fixed shadow, add
    fixedShadow && shadowArr.push(fixedShadow);

    // Set offset values
    let xOffset = settings.xOffset ? settings.xOffset : 0;
    let yOffset = settings.yOffset ? settings.yOffset : 0;

    for (let i = angle; i < (farthestPoint + angle); i++) {
      shadowArr.push(`${(-xDiff/i)+xOffset}px ${(-yDiff/i)+yOffset}px ${diffusion}px ${color}`);
    }

    element.style.textShadow = shadowArr.join();
  };

  const makeDropShadow = (element, xDiff, yDiff, farthestPoint, settings) => {
    const { angle, diffusion, color, fixedShadow } = settings;

    let shadowArr = [];

    // If fixed shadow, add
    fixedShadow && shadowArr.push(fixedShadow);

    // Set offset values
    let xOffset = settings.xOffset ? settings.xOffset : 0;
    let yOffset = settings.yOffset ? settings.yOffset : 0;

    shadowArr.push(`${(-xDiff/angle)+xOffset}px ${(-yDiff/angle)+yOffset}px ${diffusion}px ${color}`);

    element.style.textShadow = shadowArr.join();
  };

  const movingShadow = settings => {

      // Select element
      var elements = document.querySelectorAll(settings.selector);

      // Set initial fixedShadow
      settings.fixedShadow && elements.forEach(element => {
        element.style.textShadow = settings.fixedShadow;
      });

    document.onmousemove = e => handleMove(e, settings);
    document.ontouchmove = e => handleMove(e, settings);

    function handleMove(event, settings) {

      // Get mouse position
      const touchPos = getTouchPos(event);

      elements.forEach(element => {
        // Get element position
        const elePos = getElePos(element);

        const calculateDistance = (touchPos, elePos, settings) => {


          // Find difference between mouse & element
          const xDiff = touchPos.x - elePos.centerX;
          const yDiff = touchPos.y - elePos.centerY;

          // Determines furthes mouse point (x or y) from element
          const farthestPointFactor = settings.type === "dropShadow" ? 40 : 4;
          const farthestPoint = Math.round(Math.max(Math.abs(xDiff), Math.abs(yDiff))/farthestPointFactor);

          switch(settings.type) {
            case 'shadow':
              makeShadow(element, xDiff, yDiff, farthestPoint, settings);
              break;
            case 'dropShadow':
              makeDropShadow(element, xDiff, yDiff, farthestPoint, settings);
              break;
            case 'perspective':
              console.log('perspective');
              break;
            default:
              console.log('Select type');
          }
        };

        calculateDistance(touchPos, elePos, settings);
      });


      // Window specs
      // var w = window.innerWidth;
      // var h = window.innerHeight;
    }
  };

  return movingShadow;

})));
