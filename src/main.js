// main.js
import { initThreeSetup } from "./threeSetup.js";
import Lenis from "lenis";
import "./scss/main.scss";

console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  initThreeSetup();
  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });

  // Listen for the scroll event and log the event data
  lenis.on("scroll", (e) => {
    console.log(e);
  });
});
