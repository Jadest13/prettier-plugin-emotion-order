const { cosmiconfigSync } = require("cosmiconfig");

const special = require('./groups/special')
const positioning = require('./groups/positioning')
const boxModel = require('./groups/boxModel')
const typography = require('./groups/typography')
const visual = require('./groups/visual')
const animation = require('./groups/animation')
const misc = require('./groups/misc')

//prettier-emotion-order

const defaultCategory = {
  ...positioning,
  ...boxModel,
  ...typography,
  ...visual,
  ...animation,
  ...misc,
  ...special,
}

// 기본 설정
const defaultConfig = {
  emotionOrder: {},                         // 카테고리 목록
  emotionOrderSeperation: true,            // 카테고리 사이 분리
  emotionOrderText: {},                     // 카테고리 텍스트 설정
  emotionOrderTextVisible: true,           // 카테고리 텍스트 보여주기 유무
  emotionOrderUndefinedPosition: 'back',    // 설정하지 않은 카테고리 스타일 위치 : front | back
  emotionOrderUndefinedSortMethod: 'alpha',  // 설정하지 않은 카테고리 스타일 정렬 방법 : none | alpha | length | numeric

  emotionOrderDefaultCategoryEnable: true, // 기본 카테고리 사용 유무 : true | false
  emotionOrderDefaultCategoryAddMode: 'append', // 기존거에 어떻게 추가할건지 : append | prepend
  emotionOrderDefaultCategoryConflictPosition: 'auto',    // 겹치는 카테고리 위치 설정 : auto | origin | append | prepend
  emotionOrderDefaultCategoryConflictResolution: 'merge',  // 겹치는 카테고리 어떻게 처리할건지 : keep | replace | merge
  emotionOrderDefaultCategoryStyleAddMode: 'prepend',          // 겹치는 카테고리 속 스타일 어떻게 추가할 건지 : append | prepend
  emotionOrderDefaultCategoryConflictStylePosition: 'auto', // 겹치는 카테고리 속 겹치는 위치 설정 : origin | append | prepend
  emotionOrderDefaultCategoryConflictTextResolution: 'replace',  // 겹치는 카테고리 텍스트 어떻게 처리할건지 : keep | replace

  emotionOrderNested: [],// 중첩 스타일 목록
  emotionOrderNestedSeperation: true,// 중첩 스타일 사이 분리
  emotionOrderNestedIndexSortMethod: 'ascend',// 중첩 스타일 인덱스 정렬 방법 : none | ascend | descend
  emotionOrderNestedUndefinedPosition: 'front',  // 설정하지 않은 중첩 스타일 위치 : front | back
  emotionOrderNestedUndefinedSortMethod: 'alpha', // 설정하지 않은 중첩 스타일 정렬 방법 : none | alpha | length | numeric

  emotionOrderCaseInsensitiveStyle: false, // 스타일 대/소문자 구분
  emotionOrderCaseInsensitiveNested: true,  // 중첩 스타일 대/소문자 구분
}

const explorer = cosmiconfigSync("myPrettier"); // 설정 파일 탐색
const result = explorer.search(); // 설정 파일 검색
const config = {...defaultConfig, ...(result ? result.config : {})}

const {Enable, AddMode, ConflictPosition, ConflictResolution, StyleAddMode, ConflictStylePosition, ConflictTextResolution}
 = Object.fromEntries(
  Object.entries(config)
  .filter(([key]) => !key.indexOf('emotionOrderDefaultCategory'))
  .map(([key, value]) => [key.slice('emotionOrderDefaultCategory'.length), value])
)

let category = {};
if(Enable) {
  category = Object.entries(defaultCategory);

  let categoryPrependIdx = 0;
  Object.entries(config.emotionOrder).map(([userCategory, userStyle]) => {
    const conflictCategoryIdx = category.findIndex(([key]) => key == userCategory);
    if(conflictCategoryIdx == -1) {
      if(AddMode == 'prepend') {
        category.splice(categoryPrependIdx++, 0, [userCategory, {style : userStyle}]);
      } else {
        category.push([userCategory, {style : userStyle}]);
      }
    } else {
      let [conflictCategory, conflictStyle] = category[conflictCategoryIdx];

      if(ConflictResolution == 'keep') {
        conflictStyle;
      } else if(ConflictResolution == 'replace') {
        conflictStyle.style = userStyle;
      } else if(ConflictResolution == 'merge') {
        //style map
        let stylePrependIdx = 0;
        userStyle.map((style) => {
          const conflictStyleIdx = conflictStyle.style.findIndex((e) => e == style);
          if(conflictStyleIdx == -1) {
            if(StyleAddMode == 'prepend') conflictStyle.style.splice(stylePrependIdx++, 0, style);
            else if(StyleAddMode == 'append') conflictStyle.style.push(style);
          } else {
            conflictStyle.style.splice(conflictStyleIdx, 1);
            if(
              ConflictStylePosition == 'prepend' ||
              (ConflictStylePosition == 'auto' && StyleAddMode == 'prepend')
            ) {
              conflictStyle.style.splice(stylePrependIdx++, 0, style);
            } else if(
              ConflictStylePosition == 'append' ||
              (ConflictStylePosition == 'auto' && StyleAddMode == 'append')
            ) {
              conflictStyle.style.push(style);
            } else if(ConflictStylePosition == 'origin') {
              conflictStyle.style.splice(conflictStyleIdx, 0, style);
            }
          }
        })
      }

      category.splice(conflictCategoryIdx, 1);
      
      if(
        ConflictPosition == 'prepend' ||
        (ConflictPosition == 'auto' && AddMode == 'prepend')
      ) {
        category.splice(categoryPrependIdx++, 0, [conflictCategory, conflictStyle]);
      } else if(
        ConflictPosition == 'append' ||
        (ConflictPosition == 'auto' && AddMode == 'append')
      ) {
        category.push([conflictCategory, conflictStyle]);
      } else if(ConflictPosition == 'origin'){
        category.splice(conflictCategoryIdx, 0, [conflictCategory, conflictStyle]);
      }
    }
  });

  category = Object.fromEntries(category)
} else {
  category = config.emotionOrder;
}

Object.entries(config.emotionOrderText).map(([key, value]) => {
  if(category[key]?.text) {
    category[key].text = ConflictTextResolution == 'keep' ?
      category[key].text : value
  } else if(category[key]) {
    category[key].text = value;
  }
})

module.exports = () => {
  const cc = {
    category: category,
    categorySeperation : config.emotionOrderSeperation,
    categoryTextVisible : config.emotionOrderTextVisible,
    categoryUndefinedPosition : config.emotionOrderUndefinedPosition,
    categoryUndefinedSortMethod : config.emotionOrderUndefinedSortMethod,
    nested: config.emotionOrderNested,
    nestedSeperation : config.emotionOrderNestedSeperation,
    nestedIndexSortMethod : config.emotionOrderNestedIndexSortMethod,
    nestedUndefinedPosition : config.emotionOrderNestedUndefinedPosition,
    nestedUndefinedSortMethod : config.emotionOrderNestedUndefinedSortMethod,
    caseInsensitiveStyle: config.emotionOrderCaseInsensitiveStyle,
    caseInsensitiveNested: config.emotionOrderCaseInsensitiveNested
  }
  
  return cc;
}
