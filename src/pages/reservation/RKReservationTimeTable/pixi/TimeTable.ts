import * as PIXI from "pixi.js";
import { TimeTableCell } from "./TimeTableCell";

export class TimeTable {
  app: PIXI.Application;
  cells: TimeTableCell[];
  rootElement: HTMLElement;
  constructor(element: HTMLElement) {
    this.cells = [];
    this.rootElement = element;
    this.app = new PIXI.Application({
      background: "#1099bb",
      resizeTo: this.rootElement,
    });
    this.rootElement.appendChild(this.app.view as any);

    if (process.env.NODE_ENV === "development") {
      (globalThis as any).__PIXI_APP__ = this.app;
    }

    this.init();
  }

  init() {
    for (let i = 0; i < 10; i++) {
      let cell = new TimeTableCell(this.rootElement, { x: i, y: 0 });
      this.cells.push(cell);
      this.app.stage.addChild(cell.getGraphics());
    }
  }

  render() {}
}
