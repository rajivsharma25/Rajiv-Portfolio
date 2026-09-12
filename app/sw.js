import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";

// Exclude heavy media (project images, profile, PDF resumes) from SW precache
// This avoids downloading ~500KB of assets on initial page load.
// Images will be lazy-loaded on-demand and cached at runtime via defaultCache.
const precacheEntries = (self.__SW_MANIFEST || []).filter((entry) => {
  const url = typeof entry === "string" ? entry : entry.url;
  return !url.match(/\.(webp|png|jpg|jpeg|gif|svg|pdf|mp4)$/i);
});

const serwist = new Serwist({
  precacheEntries,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
