/**
 * longbOTTON_dev
 * library for scroll animation effect
 * copyright 2020
 *
 * @format
 */

function scrollReveal(obj) {
  window.addEventListener("scroll", scrollAppear.bind(this, obj)); //scroll reveal

  function scrollAppear(obj) {
    const {
      elem,
      distance,
      duration,
      delay,
      newClass,
      newStyle: newStyleObj,
    } = obj;

    // Make multiple selection possible
    if (Array.isArray(elem)) {
      return elem.forEach((elem) => {
        let elemObj = { ...obj, elem: elem };
        scrollAppear(elemObj);
      });
    }

    const domElem = document.querySelector(elem);
    domElemPosition = domElem.getBoundingClientRect().top;
    screenPosition = window.innerHeight;
    if (domElemPosition + (distance ? distance : 100) < screenPosition) {
      setTimeout(
        () => {
          domElem.style.transition = `all ${
            duration ? duration : ".5"
          }s ease-in-out`;
          // if new class is available, add new class to classlist
          if (newClass) domElem.classList.add(newClass);
          if (newStyleObj) {
            for (const styleIndex in newStyleObj) {
              // loop through new style object and register styles
              domElem.style[styleIndex] = newStyleObj[styleIndex];
            }
          }
        },
        delay ? delay : 0 // if delay is set render delay or use default which is zero
      );
    }
  }
}
