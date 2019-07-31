import { SeriesItemsIndexesRange } from '../model/time-data';

import { LineType } from './draw-line';
import { LineStyledItem } from './line-styled-renderer';

/**
 * BEWARE: The method must be called after beginPath and before stroke/fill/closePath/etc
 */
export function walkLineStyled(
	ctx: CanvasRenderingContext2D,
	points: ReadonlyArray<LineStyledItem>,
	lineType: LineType,
	visibleRange: SeriesItemsIndexesRange
): void {
	if (points.length === 0) {
		return;
	}

	let prevColor: string | null = null;

	for (let i = visibleRange.from + 1; i < visibleRange.to; ++i) {
		const currItem = points[i];
		const prevItem = points[i - 1];

		if (prevColor !== currItem.color) {
			ctx.strokeStyle = currItem.color;
			prevColor = currItem.color;
		}

		// ctx.strokeStyle = '#' + ((Math.random() * 0xffffff) << 0).toString(16);

		ctx.beginPath();

		ctx.moveTo(prevItem.x, prevItem.y);
		//  x---x---x   or   x---x   o   or   start
		if (lineType === LineType.WithSteps) {
			const currX = currItem.x;
			const prevY = prevItem.y;
			ctx.lineTo(currX, prevY);
		}

		ctx.lineTo(currItem.x, currItem.y);
		ctx.stroke();
	}
}
