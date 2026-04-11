/**
 * Controller — global UI behavior (extend for mobile nav, forms, analytics).
 */
(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () {
    document.documentElement.classList.add("js");
  });
})();
