const borderProps = require('./border');

const a = [
  'listStyle',
  'listStylePosition',
  'listStyleType',
  'listStyleImage',
  'tableLayout',
  'emptyCells',
  'captionSide',
  'background',
  'backgroundColor',
  'backgroundImage',
  'backgroundRepeat',
  'backgroundPosition',
  'backgroundPositionX',
  'backgroundPositionY',
  'backgroundSize',
  'backgroundClip',
  'backgroundOrigin',
  'backgroundAttachment',
  'backgroundBlendMode',
];

const b = [
  'outline',
  'outlineWidth',
  'outlineStyle',
  'outlineColor',
  'outlineOffset',
  'boxShadow',
  'boxDecorationBreak',
  'transform',
  'transformOrigin',
  'transformStyle',
  'backfaceVisibility',
  'perspective',
  'perspectiveOrigin',
  'visibility',
  'cursor',
  'opacity',
  'filter',
  'isolation',
  'backdropFilter',
  'mixBlendMode',
];

module.exports = {
  Visual: {
    style: [].concat(a, borderProps, b),
    text: 'Visual',
  },
};
