import React from "react";
import { forwardRef, useEffect, useMemo, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  attach?: HTMLElement | string;
  children: React.ReactNode;
}

const Portal = forwardRef((props: PortalProps, ref) => {
  const { attach = document.body, children } = props;

  const container = useMemo(() => {
    const el = document.createElement("div");
    el.className = "portal-wrapper";
    return el;
  }, []);

  useEffect(() => {
    const parentElement = getAttach(attach);
    parentElement?.appendChild?.(container);

    return () => {
      parentElement?.removeChild?.(container);
    };
  }, [container, attach]);

  useImperativeHandle(ref, () => container);

  return createPortal(children, container);
});

export default Portal;

function getAttach(attach: PortalProps["attach"]) {
  if (typeof attach === "string") {
    return document.querySelector(attach);
  }
  if (typeof attach === "object" && attach instanceof window.HTMLElement) {
    return attach;
  }
  return document.body;
}
