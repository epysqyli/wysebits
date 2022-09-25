import { createContext } from "react";

interface Overlay {
  showOverlay: Function;
  hideOverlay: Function;
  secondaryLayer?: boolean;
}

const showOverlayCallback = (showFn: Function) => showFn();
const hideOverlayCallback = (hideFn: Function) => hideFn();

const OverlayContext = createContext<Overlay>({
  showOverlay: showOverlayCallback,
  hideOverlay: hideOverlayCallback,
});

const OverlayProvider = OverlayContext.Provider;

export { OverlayContext, OverlayProvider };
