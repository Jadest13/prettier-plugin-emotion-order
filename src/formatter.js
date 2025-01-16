const getConfig = require("./config");
const { types: t } = require("@babel/core");

const traverse = require("@babel/traverse").default;
const config = getConfig();

const formatCaseInsensitiveList = (caseInsensitive, e) => {
  return e.map((e) => {
    return caseInsensitive ? e : e.toLowerCase();
  })
}

const formatCaseInsensitive = (caseInsensitive, e) => {
  return caseInsensitive ? e : e.toLowerCase();
}

module.exports = (ast) => {

  applyHelloFormatting(ast);

  return ast;
}

function applyHelloFormatting(ast) {

  const sortedStyle = Object.fromEntries(Object.entries(config.category).map(([key, value]) =>
    [key, {...value, style : formatCaseInsensitiveList(config.caseInsensitiveStyle, value.style)}]))
  const sortedNested = formatCaseInsensitiveList(config.caseInsensitiveNested, config.nested);

  const compareMethod = (a, b, method) => {
    if(method === 'alpha') return a.localeCompare(b)
    if(method === 'alpha-reverse') return b.localeCompare(a)
    if(method === 'length-ascend') return a.length - b.length;
    if(method === 'length-descend') return b.length - a.length;
    return 0;
  }

  // 오브젝트 정렬 및 포맷팅 함수
  function sortAndFormatObjectProperties(objNode) {
    const properties = objNode.properties;

    const normalProps = [];
    const computedProps = [];
    const otherProps = [];

    properties.forEach((prop) => (t.isObjectExpression(prop.value) ? computedProps : t.isObjectProperty(prop) ? normalProps : otherProps).push(prop));

    normalProps.sort((a, b) => {
      const getInfo = (item) => {
        const key = formatCaseInsensitive(config.caseInsensitiveStyle, item.key.name || item.key.value);
        const categoryIdx = Object.values(sortedStyle).findIndex(({ style }) => style.includes(key));
        const styleIdx = categoryIdx !== -1 
          ? Object.values(sortedStyle)[categoryIdx].style.indexOf(key)
          : -1;
        return [ key, categoryIdx, styleIdx ];
      };

      const [[aKey, aCatIdx, aStyIdx], [bKey, bCatIdx, bStyIdx]] = [a, b].map(getInfo);

      return aCatIdx === bCatIdx
        ? aCatIdx === -1
          ? compareMethod(aKey, bKey, config.categoryUndefinedSortMethod)
          : aStyIdx - bStyIdx
        : aCatIdx === -1 || bCatIdx === -1
          ? aCatIdx === -1 === (config.categoryUndefinedPosition === 'back') ? 1 : -1
          : aCatIdx - bCatIdx;
    });

    computedProps.sort((a, b) => {
      const getKey = (e) => t.isMemberExpression(e.key)
        ? [formatCaseInsensitive(config.caseInsensitiveNested, e.key.object.name), e.key.property.value]
        : [formatCaseInsensitive(config.caseInsensitiveNested, e.key.value || e.key.name), 0];
    
      const [[aName, aIdx], [bName, bIdx]] = [a, b].map(getKey);
      const [aPos, bPos] = [aName, bName].map((name) => sortedNested.indexOf(name));
    
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
      if (t.isObjectExpression(prop.value)) {
        prop.value = sortAndFormatObjectProperties(prop.value);
      }
    });

    otherProps.map((_, i) => traverseStyle(100, otherProps, i))

    // 정렬된 속성 병합 및 줄바꿈 추가
    let before = undefined;
    const formattedProperties = [
      ...normalProps.map((prop) => {
        const key = formatCaseInsensitive(config.caseInsensitiveStyle, prop.key.name || prop.key.value);
        const categoryIdx = Object.values(sortedStyle).findIndex(({ style }) => style.includes(key));
        const categoryName = Object.keys(sortedStyle)[categoryIdx];
    
        prop.leadingComments = [
          ...(before !== categoryName && config.categorySeperation && before ? [{ type: "CommentLine", value: " temp line" }] : []),
          ...(before !== categoryName && config.categoryTextVisible && categoryName ? [{ type: "CommentLine", value: ` ${Object.values(sortedStyle)[categoryIdx].text}` }] : []),
        ];
    
        before = categoryName;
        return prop;
      }),
      ...computedProps.map((prop, idx) => {
        prop.leadingComments = [
          ...(config.categorySeperation && !idx && normalProps.length ? [{ type: "CommentLine", value: " temp line" }] : []),
          ...(config.nestedSeperation && idx ? [{ type: "CommentLine", value: " temp line" }] : []),
        ];
        return prop;
      }),
      ...otherProps
    ];

    // 유효한 ObjectExpression 반환
    return t.objectExpression(formattedProperties.filter((prop) => t.isNode(prop)));
  }

  const single = ['body', 'left', 'right', 'consequent', 'alternate', 'argument'];
  const multi = ['arguments', 'params'];

  const traverseStyle = (depth, node, key) => {
    let r = node[key];

    if(t.isObjectExpression(r)) {
      r = sortAndFormatObjectProperties(r)
    } else {
      single.forEach((e) => {
        if(e in r)
          r[e] = traverseStyle(depth+1, r, e);
      })

      multi.forEach((e) => {
        if(e in r)
          r[e].map((_, i) => traverseStyle(depth+1, r[e], i));
      })
    }
    node[key] = r;
    return node[key];
  }

  // AST 트래버스
  traverse(ast, {
    CallExpression(path) {
      const callee = path.node.callee;
    
      if(
        (t.isMemberExpression(callee) && t.isIdentifier(callee.object, { name: "styled" }) ) ||
        (t.isCallExpression(callee) && t.isIdentifier(callee.callee, {name: "styled"}))
      ) {
        traverseStyle(0, path, 'node');
      }
    },
  });
}