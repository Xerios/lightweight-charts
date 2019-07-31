import { BarPrice } from '../../model/bar';
import { ChartModel } from '../../model/chart-model';
import { Series } from '../../model/series';
import { SeriesBarColorer } from '../../model/series-bar-colorer';
import { TimePointIndex } from '../../model/time-data';
import { IPaneRenderer } from '../../renderers/ipane-renderer';
import { LineStyledItem, PaneRendererStyledLine, PaneRendererStyledLineData } from '../../renderers/line-styled-renderer';

import { LinePaneViewBase } from './line-pane-view-base';

export class SeriesLineStyledPaneView extends LinePaneViewBase<'LineStyled', LineStyledItem> {
	private readonly _lineRenderer: PaneRendererStyledLine = new PaneRendererStyledLine();

	public constructor(series: Series<'LineStyled'>, model: ChartModel) {
		super(series, model);
	}

	public renderer(height: number, width: number): IPaneRenderer {
		this._makeValid();

		const lineStyleProps = this._series.options();

		const data: PaneRendererStyledLineData = {
			items: this._items,
			lineColor: lineStyleProps.color,
			lineStyle: lineStyleProps.lineStyle,
			lineType: 0,
			lineWidth: lineStyleProps.lineWidth,
			visibleRange: this._itemsVisibleRange,
		};

		this._lineRenderer.setData(data);

		return this._lineRenderer;
	}

	protected _createRawItem(time: TimePointIndex, price: BarPrice, colorer: SeriesBarColorer): LineStyledItem {
		return {
			...this._createRawItemBase2(time, price, colorer),
			color: colorer.barStyle(time).barColor,
		};
	}
}
