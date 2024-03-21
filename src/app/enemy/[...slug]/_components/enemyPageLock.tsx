"use client";
import { useEffect } from "react";

/**
 * @description This locks scrolling on `/enemy/[...slug]` route at
 *  <1024px to allow for a "full-screen" modal.
 */
export default function EnemyPageLock() {
  useEffect(() => {
    if (document) document.body.setAttribute("data-enemyPgLock", "true");
    // Once we leave the page, the cleanup function will run and remove the lock
    return () => document.body.removeAttribute("data-enemyPgLock");
  }, []);

  return null;
}
