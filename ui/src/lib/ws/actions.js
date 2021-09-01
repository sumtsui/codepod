// modules/websocket.js

export const wsConnect = () => ({ type: "WS_CONNECT" });
export const wsConnecting = (host) => ({ type: "WS_CONNECTING", host });
export const wsConnected = () => ({ type: "WS_CONNECTED" });
export const wsDisconnect = () => ({ type: "WS_DISCONNECT" });
export const wsDisconnected = () => ({ type: "WS_DISCONNECTED" });
export const wsStatus = (payload) => ({
  type: "WS_STATUS",
  payload,
});
export const wsRequestStatus = (payload) => ({
  type: "WS_REQUEST_STATUS",
  payload,
});
export const wsRun = (payload) => ({
  type: "WS_RUN",
  payload,
});
export const wsRunAll = (payload) => ({
  type: "WS_RUN_ALL",
  payload,
});
export const wsRunTree = (payload) => ({
  type: "WS_RUN_TREE",
  payload,
});
export const wsResult = (payload) => ({
  type: "WS_RESULT",
  payload,
});
export const wsDisplayData = (payload) => ({
  type: "WS_DISPLAY_DATA",
  payload,
});
export const wsExecuteReply = (payload) => ({
  type: "WS_EXECUTE_REPLY",
  payload,
});
export const wsStdout = (payload) => ({
  type: "WS_STDOUT",
  payload,
});
export const wsError = (payload) => ({
  type: "WS_ERROR",
  payload,
});
export const wsStream = (payload) => ({
  type: "WS_STREAM",
  payload,
});
export const wsIOResult = (payload) => ({
  type: "WS_IO_RESULT",
  payload,
});
export const wsIOError = (payload) => ({
  type: "WS_IO_ERROR",
  payload,
});

export const wsToggleExport = (payload) => ({
  type: "WS_TOGGLE_EXPORT",
  payload,
});

export const wsToggleImport = (payload) => ({
  type: "WS_TOGGLE_IMPORT",
  payload,
});

export const wsToggleMidport = (payload) => ({
  type: "WS_TOGGLE_MIDPORT",
  payload,
});

export const wsInterruptKernel = (payload) => ({
  type: "WS_INTERRUPT_KERNEL",
  payload,
});
