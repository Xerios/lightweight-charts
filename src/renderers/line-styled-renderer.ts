import { PricedValue } from '../model/price-scale';
import { SeriesItemsIndexesRange, TimedValue } from '../model/time-data';

import { LinePoint, LineStyle, LineType, LineWidth, setLineStyle } from './draw-line';
import { IPaneRenderer } from './ipane-renderer';
import { walkLineStyled } from './walk-styled-line';

export type LineStyledItemBase = TimedValue & PricedValue & LinePoint;

export interface LineStyledItem extends LineStyledItemBase {
	color: string;
}

export interface PaneRendererStyledLineData {
	lineType: LineType;

	items: LineStyledItem[];

	lineColor: string;
	lineWidth: LineWidth;
	lineStyle: LineStyle;

	visibleRange: SeriesItemsIndexesRange | null;
}

export class PaneRendererStyledLine implements IPaneRenderer {
	protected _data: PaneRendererStyledLineData | null = null;

	public setData(data: PaneRendererStyledLineData): void {
		this._data = data;
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		if (this._data === null || this._data.items.length === 0 || this._data.visibleRange === null) {
			return;
		}

		ctx.lineCap = 'square';
		ctx.lineWidth = this._data.lineWidth;

		setLineStyle(ctx, this._data.lineStyle);

		ctx.strokeStyle = this._data.lineColor;
		ctx.lineJoin = 'miter';

		walkLineStyled(ctx, this._data.items, this._data.lineType, this._data.visibleRange);
	}
}
