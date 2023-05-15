const FLEX_START_STRING = 'flex-start';
const FLEX_END_STRING = 'flex-end';
const CENTER_STRING = 'center';
const STRETCH_STRING = 'stretch';
const SPACE_BETWEEN_STRING = 'space-between';
const SPACE_AROUND_STRING = 'space-around';
const BASELINE_STRING = 'baseline';

export enum AlignContentTo {
  FLEX_START = FLEX_START_STRING,
  FLEX_END = FLEX_END_STRING,
  CENTER = CENTER_STRING,
  STRETCH = STRETCH_STRING,
  SPACE_BETWEEN = SPACE_BETWEEN_STRING,
  SPACE_AROUND = SPACE_AROUND_STRING,
}

export enum JustifyContentTo {
  FLEX_START = FLEX_START_STRING,
  FLEX_END = FLEX_END_STRING,
  CENTER = CENTER_STRING,
  SPACE_BETWEEN = SPACE_BETWEEN_STRING,
  SPACE_AROUND = SPACE_AROUND_STRING,
  SPACE_EVENLY = 'space-evenly',
}

export enum AlignSelfTo {
  AUTO = 'auto',
  FLEX_START = FLEX_START_STRING,
  FLEX_END = FLEX_END_STRING,
  CENTER = CENTER_STRING,
  STRETCH = STRETCH_STRING,
  BASELINE = BASELINE_STRING
}

export enum AlignItemsTo {
  FLEX_START = FLEX_START_STRING,
  FLEX_END = FLEX_END_STRING,
  CENTER = CENTER_STRING,
  STRETCH = STRETCH_STRING,
  BASELINE = BASELINE_STRING
}

export enum FlexDirectionTo {
  ROW = 'row',
  COLUMN = 'column',
  ROW_REVERSE = 'row-reverse',
  COLUMN_REVERSE = 'column-reverse'
}

export enum FlexWrapTo {
  WRAP = 'wrap',
  NOWRAP = 'nowrap',
  WRAP_REVERSE = 'wrap-reverse'
}

export enum OverflowTo {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  SCROLL = 'scroll'
}

export enum PositionTo {
  ABSOLUTE = 'absolute',
  RELATIVE = 'relative',
}

export enum DirectionTo {
  INHERIT = 'inherit',
  LEFT_TO_RIGHT = 'ltr',
  RIGHT_TO_LEFT = 'rtl'
}
