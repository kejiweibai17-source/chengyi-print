"use client";

import { useSyncExternalStore } from "react";

/**
 * 會員登入狀態（目前為 Demo：以 localStorage 記錄）。
 * 正式串接會員系統後，把 read/write 換成 session／cookie 即可，
 * 導覽列「登入／會員中心」切換邏輯不需要再改。
 */
const KEY = "cy-member-logged-in";
const EVENT = "cy-member-session";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function read() {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function setMemberLoggedIn(value: boolean) {
  try {
    if (value) window.localStorage.setItem(KEY, "1");
    else window.localStorage.removeItem(KEY);
  } catch {
    /* 隱私模式等情況略過 */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useMemberLoggedIn() {
  return useSyncExternalStore(subscribe, read, () => false);
}
