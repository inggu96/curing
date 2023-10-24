import * as PIXI from "pixi.js";

interface Position {
  x: number;
  y: number;
}

const TIME_TABLE_CELL_VALUES = {
  BORDER: 5,
};

export class TimeTableCell {
  graphics: PIXI.Graphics;
  pos: Position;
  rootElement: HTMLElement;
  constructor(root: HTMLElement, pos: Position) {
    this.pos = pos;
    this.rootElement = root;
    this.init();
  }

  init() {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(Math.random() * 255 * 255 * 255);
    this.graphics.drawRect(this.pos.x * 100, this.pos.y * 32, 100, 32);
    this.graphics.beginFill(Math.random() * 255 * 255 * 255);
    this.graphics.position.set(this.pos.x * 100, this.pos.y * 32);
    this.graphics.drawRect(
      this.pos.x * 100 + TIME_TABLE_CELL_VALUES.BORDER,
      this.pos.y * 32 + TIME_TABLE_CELL_VALUES.BORDER,
      100 - TIME_TABLE_CELL_VALUES.BORDER,
      32 - TIME_TABLE_CELL_VALUES.BORDER
    );
    this.graphics.endFill();
  }

  getGraphics() {
    return this.graphics;
  }
}
