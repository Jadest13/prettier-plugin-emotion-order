"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortObjectProperties = sortObjectProperties;
const _types = __importDefault(require("@babel/types"));
const _traverseStyledComponent = require("./traverse-styled-component");

const formatCaseInsensitiveList = (caseInsensitive, e) => {
  return e.map((e) => caseInsensitive ? e : e.toLowerCase())
}

const formatCaseInsensitive = (caseInsensitive, e) => {
  return caseInsensitive ? e : e.toLowerCase();
}

const compareMethod = (a, b, method) => {
  if(method === 'alpha') return a.localeCompare(b)
  if(method === 'alpha-reverse') return b.localeCompare(a)
  if(method === 'length') return a.length - b.length;
  if(method === 'length-reverse') return b.length - a.length;
  return 0;
}

const getInfo = (item, sortedStyle, config) => {
  const key = formatCaseInsensitive(config.caseInsensitiveStyle, item.key.name || item.key.value);
  const categoryIdx = Object.values(sortedStyle).findIndex(({ style }) => style.includes(key));
  const styleIdx = categoryIdx !== -1 
    ? Object.values(sortedStyle)[categoryIdx].style.indexOf(key)
    : -1;
  return [ key, categoryIdx, styleIdx ];
};

function sortObjectProperties(node, config) {
  // console.log(config);

  const sortedStyle = Object.fromEntries(Object.entries(config.category).map(([key, value]) =>
    [key, {...value, style : formatCaseInsensitiveList(config.caseInsensitiveStyle, value.style)}]))
  const sortedNested = formatCaseInsensitiveList(config.caseInsensitiveNested, config.nested);

  const normalProps = [];
  const computedProps = [];
  const otherProps = [];
  
  node.properties.forEach((prop) => {
    if(prop.comments || prop.leadingComments || prop.trailingComments) {
      if(prop.leadingComments) {
        prop.leadingComments = prop.leadingComments.filter((e) => e.value.trim() != 'TMP')
      }
    }
    ((0, _types.isObjectExpression)(prop.value) ? computedProps : (0, _types.isObjectProperty)(prop) ? normalProps : otherProps).push(prop)
  });

  normalProps.sort((a, b) => {
    const [[aKey, aCatIdx, aStyIdx], [bKey, bCatIdx, bStyIdx]] = [a, b].map((e)=>getInfo(e, sortedStyle, config));

    return aCatIdx === bCatIdx
      ? aCatIdx === -1
        ? compareMethod(aKey, bKey, config.categoryUndefinedSortMethod)
        : aStyIdx - bStyIdx
      : aCatIdx === -1 || bCatIdx === -1
        ? aCatIdx === -1 === (config.categoryUndefinedPosition === 'back') ? 1 : -1
        : aCatIdx - bCatIdx;
  })

  computedProps.sort((a, b) => {
    const getKey = (e) => (0, _types.isMemberExpression)(e.key)
      ? [formatCaseInsensitive(config.caseInsensitiveNested, e.key.object.name), e.key.property.value]
      : [formatCaseInsensitive(config.caseInsensitiveNested, e.key.value || e.key.name), 0];
  
    const [[aName, aIdx], [bName, bIdx]] = [a, b].map(getKey);
    const [aPos, bPos] = [aName, bName].map((name) => config.nested.indexOf(name));
  
    return aPos === bPos
      ? aPos === -1
        ? compareMethod(aName, bName, config.nestedUndefinedSortMethod)
        : config.nestedIndexSortMethod === 'ascend' ? aIdx - bIdx
          : config.nestedIndexSortMethod === 'descend' ? bIdx - aIdx
          : 0
      : (aPos === -1 ? (config.nestedUndefinedPosition === 'back' ? 1 : -1) : 0)
        - (bPos === -1 ? (config.nestedUndefinedPosition === 'back' ? 1 : -1) : 0)
        || aPos - bPos;
  });

  // 계산된 속성 내부 정렬
  computedProps.forEach((prop) => {
    if ((0, _types.isObjectExpression)(prop.value)) {
      prop.value = sortObjectProperties(prop.value, config);
    }
  });

  otherProps.map((_, i) => (0, _traverseStyledComponent.traverseStyledComponent)(otherProps, i, config))

  let before = undefined;
  const formattedProperties = [
    ...normalProps.map((prop, idx) => {
      const key = formatCaseInsensitive(config.caseInsensitiveStyle, prop.key.name || prop.key.value);
      const categoryIdx = Object.values(sortedStyle).findIndex(({ style }) => style.includes(key));
      const categoryName = Object.keys(sortedStyle)[categoryIdx];
  
      (0, _types.removeComments)(prop);
      
      if(before !== categoryName && config.categoryTextVisible && categoryName) {
        (0, _types.addComments)(prop, 'leading', [{ type: "CommentLine", value: ` ${Object.values(sortedStyle)[categoryIdx].text}` }] || [])
      }
      if(before !== categoryName && config.categorySeperation && idx) {
        (0, _types.addComments)(prop, 'leading', [{ type: "CommentLine", value: " TMP" }] || [])
      }
  
      before = categoryName;
      return prop;
    }),
    ...computedProps.map((prop, idx) => {
      
      (0, _types.removeComments)(prop);
      if(config.categorySeperation && !idx && normalProps.length) {
        (0, _types.addComments)(prop, 'leading', [{ type: "CommentLine", value: " TMP" }] || [])
      }
      if(config.nestedSeperation && idx) {
        (0, _types.addComments)(prop, 'leading', [{ type: "CommentLine", value: " TMP" }] || [])
      }
      return prop;
    }),
    ...otherProps
  ];

  // 유효한 ObjectExpression 반환
  return (0, _types.objectExpression)(formattedProperties.filter((prop) => (0, _types.isNode)(prop)));
}
