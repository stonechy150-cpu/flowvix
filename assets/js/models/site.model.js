/**
 * Model — site-wide navigation and brand (single source for hrefs).
 */
(function (g) {
  g.FlowvixModels = g.FlowvixModels || {};
  g.FlowvixModels.site = {
    pages: {
      home: { path: "index.html", label: "Home" },
      service: { path: "service.html", label: "Services" },
      edge: { path: "edge.html", label: "Edge" },
    },
    copyright: "© 2024 Flowvix AI Agency. All rights reserved.",
  };
})(typeof window !== "undefined" ? window : globalThis);
