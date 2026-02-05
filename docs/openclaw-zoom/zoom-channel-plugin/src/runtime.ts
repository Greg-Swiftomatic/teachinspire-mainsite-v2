// Runtime singleton for Zoom plugin - receives the OpenClaw runtime API during registration.

import type { OpenClawPluginApi } from "openclaw/plugin-sdk";

type ZoomRuntime = OpenClawPluginApi["runtime"];

let zoomRuntime: ZoomRuntime | null = null;

export function setZoomRuntime(runtime: ZoomRuntime): void {
  zoomRuntime = runtime;
}

export function getZoomRuntime(): ZoomRuntime {
  if (!zoomRuntime) {
    throw new Error("Zoom runtime not initialized. Plugin not registered yet?");
  }
  return zoomRuntime;
}
