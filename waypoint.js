document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Default settings for animations
  const DEFAULT_DURATION = 1;
  const DEFAULT_EASE = "power3.inOut";
  const DEFAULT_STAGGER = 0.2;
  const DEFAULT_Y_OFFSET = 25;
  const DEFAULT_X_OFFSET = 50; // used for left/right animations

  // Helper: Determines the "from" vars based on an element's own waypoint-style or an optional fallback.
  function getFromVars(el, fallbackStyle = null) {
    // If the element doesn't have its own attribute, use the fallback if provided.
    let style = el.getAttribute("waypoint-style") || fallbackStyle;
    let fromVars = { opacity: 0 };
    switch (style) {
      case "left":
        fromVars.x = -DEFAULT_X_OFFSET;
        break;
      case "right":
        fromVars.x = DEFAULT_X_OFFSET;
        break;
      case "top":
        fromVars.y = -DEFAULT_Y_OFFSET;
        break;
      case "bottom":
        fromVars.y = DEFAULT_Y_OFFSET;
        break;
      case "fade":
        // Only fade: no offset changes needed
        break;
      default:
        // Default: fade in with a slight upward movement
        fromVars.y = DEFAULT_Y_OFFSET;
    }
    return fromVars;
  }

  // CSS fallback: all elements with waypoint attribute are initially hidden.
  gsap.set("[waypoint]", { opacity: 1 });

  // --- GROUPED ELEMENTS ---
  // Instead of a simple array of elements, we now store an object with the element and
  // an optional fallback style from its parent.
  const groups = {};
  document
    .querySelectorAll("[waypoint][waypoint-group]")
    .forEach((parentEl) => {
      const groupName = parentEl.getAttribute("waypoint-group");
      if (!groups[groupName]) groups[groupName] = [];

      if (parentEl.getAttribute("waypoint") === "these") {
        // Get the parent's waypoint-style to use as a fallback for its children.
        const fallbackStyle = parentEl.getAttribute("waypoint-style");
        Array.from(parentEl.children).forEach((child) => {
          groups[groupName].push({ el: child, fallback: fallbackStyle });
        });
      } else {
        // waypoint="this"
        groups[groupName].push({ el: parentEl, fallback: null });
      }
    });

  // Create a timeline for each group.
  Object.keys(groups).forEach((groupName) => {
    const groupItems = groups[groupName];
    if (!groupItems.length) return;

    // Use the first element in the group as the ScrollTrigger reference.
    const triggerElement = groupItems[0].el;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 80%",
        end: "bottom 50%",
        toggleActions: "play none none pause",
        // markers: true, // uncomment for debugging
      },
      defaults: {
        duration: DEFAULT_DURATION,
        ease: DEFAULT_EASE,
      },
    });

    // Add each element to the timeline with a stagger. For each element, call getFromVars
    // passing in its fallback style (if any) from its parent.
    groupItems.forEach((item, i) => {
      tl.fromTo(
        item.el,
        getFromVars(item.el, item.fallback),
        { opacity: 1, x: 0, y: 0 },
        i * DEFAULT_STAGGER
      );
    });
  });

  // --- UNGROUPED ELEMENTS ---
  // Process any element with a waypoint attribute that isn’t part of a group.
  const ungrouped = document.querySelectorAll(
    "[waypoint]:not([waypoint-group])"
  );
  ungrouped.forEach((el) => {
    // If the element is a container (waypoint="these"), animate its children.
    if (el.getAttribute("waypoint") === "these") {
      const fallbackStyle = el.getAttribute("waypoint-style");
      const children = Array.from(el.children);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 50%",
          toggleActions: "play none none pause",
          // markers: true, // uncomment for debugging
        },
      });
      children.forEach((child, i) => {
        tl.fromTo(
          child,
          getFromVars(child, fallbackStyle),
          { opacity: 1, x: 0, y: 0 },
          i * DEFAULT_STAGGER
        );
      });
    } else {
      // waypoint="this"
      gsap.fromTo(el, getFromVars(el), {
        opacity: 1,
        x: 0,
        y: 0,
        duration: DEFAULT_DURATION,
        ease: DEFAULT_EASE,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 50%",
          toggleActions: "play none none pause",
          // markers: true, // uncomment for debugging
        },
      });
    }
  });
});
