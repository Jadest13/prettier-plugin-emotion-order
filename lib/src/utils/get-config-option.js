"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigOption = getConfigOption;
const fs = require('fs');
const path = require("path");
const _types = __importDefault(require("@babel/types"));

const special = require('./group/special')
const positioning = require('./group/positioning')
const boxModel = require('./group/boxModel')
const typography = require('./group/typography')
const visual = require('./group/visual')
const animation = require('./group/animation')
const misc = require('./group/misc')

//prettier-emotion-order

function getCommonPath(path1, path2) {
  const parts1 = path.resolve(path1).split(path.sep);
  const parts2 = path.resolve(path2).split(path.sep);

  const commonParts = [];
  for (let i = 0; i < Math.min(parts1.length, parts2.length); i++) {
    if (parts1[i] === parts2[i]) {
      commonParts.push(parts1[i]);
    } else {
      break;
    }
  }

  return commonParts.length ? commonParts.join(path.sep) : null;
}

function getCategory(userCategory, options) {
  const defaultCategory = {
    ...positioning,
    ...boxModel,
    ...typography,
    ...visual,
    ...animation,
    ...misc,
    ...special,
  }

  const {Enable, AddMode, ConflictPosition, ConflictResolution, StyleAddMode, ConflictStylePosition, ConflictTextResolution}
   = Object.fromEntries(
    Object.entries(options)
    .filter(([key]) => !key.indexOf('emotionOrderDefaultCategory'))
    .map(([key, value]) => [key.slice('emotionOrderDefaultCategory'.length), value])
  )
  
  let category = {};

  if(Enable) {
    category = Object.entries(defaultCategory);

    let categoryPrependIdx = 0;
    Object.entries(userCategory).map(([currCategory, {style : currStyle, text: currText}]) => {
      const conflictCategoryIdx = category.findIndex(([key]) => key == currCategory);
      if(conflictCategoryIdx == -1) {
        if(AddMode == 'prepend') {
          category.splice(categoryPrependIdx++, 0, [currCategory, {style : currStyle, text: currText}]);
        } else {
          category.push([currCategory, {style : currStyle, text: currText}]);
        }
      } else {
        let [conflictCategory, {style: conflictStyle, text: conflictText}] = category[conflictCategoryIdx];
        
        if(ConflictResolution == 'keep') {
          conflictStyle;
        } else if(ConflictResolution == 'replace') {
          conflictStyle = currStyle;
        } else if(ConflictResolution == 'merge') {
          let stylePrependIdx = 0;

          currStyle.map((style) => {
            const conflictStyleIdx = conflictStyle.findIndex((e) => e == style);
            if(conflictStyleIdx == -1) {
              if(StyleAddMode == 'prepend') conflictStyle.splice(stylePrependIdx++, 0, style);
              else if(StyleAddMode == 'append') conflictStyle.push(style);
            } else {

              conflictStyle.splice(conflictStyleIdx, 1);

              if(
                ConflictStylePosition == 'prepend' ||
                (ConflictStylePosition == 'auto' && StyleAddMode == 'prepend')
              ) {
                conflictStyle.splice(stylePrependIdx++, 0, style);
              } else if(
                ConflictStylePosition == 'append' ||
                (ConflictStylePosition == 'auto' && StyleAddMode == 'append')
              ) {
                conflictStyle.push(style);
              } else if(ConflictStylePosition == 'origin') {
                conflictStyle.splice(conflictStyleIdx, 0, style);
              }
            }
          })
        }

        if (!currText) conflictText;
        else if (!conflictText) conflictText = currText;
        else if (currText && conflictText) {
          conflictText = ConflictTextResolution == 'keep' ? conflictText : currText
        }

        //text
        
        category.splice(conflictCategoryIdx, 1);
        
        if(
          ConflictPosition == 'prepend' ||
          (ConflictPosition == 'auto' && AddMode == 'prepend')
        ) {
          category.splice(categoryPrependIdx++, 0, [conflictCategory, {style: conflictStyle, text: conflictText}]);
        } else if(
          ConflictPosition == 'append' ||
          (ConflictPosition == 'auto' && AddMode == 'append')
        ) {
          category.push([conflictCategory, {style: conflictStyle, text: conflictText}]);
        } else if(ConflictPosition == 'origin'){
          category.splice(conflictCategoryIdx, 0, [conflictCategory, {style: conflictStyle, text: conflictText}]);
        }
      }
    });

    category = Object.fromEntries(category)
  } else {
    category = userCategory;
  }

  return category;
}

function getConfigOption(options) {
  const config = {};

  const emotionOrderConfigPath = getCommonPath(__filename, options.filepath) + path.sep + '.emotionorderrc';

  config.category = {};
  config.nested = [];

  if (fs.existsSync(emotionOrderConfigPath)) {
    const fileContent = fs.readFileSync(emotionOrderConfigPath, 'utf8');
    const object = JSON.parse(fileContent);
    config.category = object.Category;
    config.nested = object.Nested;
  } else {
    console.error('File does not exist:', emotionOrderConfigPath);
  }

  config.category = getCategory(config.category, options);
  

  Object.assign(config, {
    categorySeperation : options.emotionOrderSeperation,
    categoryTextVisible : options.emotionOrderTextVisible,
    categoryUndefinedPosition : options.emotionOrderUndefinedPosition,
    categoryUndefinedSortMethod : options.emotionOrderUndefinedSortMethod,

    nestedSeperation : options.emotionOrderNestedSeperation,
    nestedIndexSortMethod : options.emotionOrderNestedIndexSortMethod,
    nestedUndefinedPosition : options.emotionOrderNestedUndefinedPosition,
    nestedUndefinedSortMethod : options.emotionOrderNestedUndefinedSortMethod,

    caseInsensitiveStyle: options.emotionOrderCaseInsensitiveStyle,
    caseInsensitiveNested: options.emotionOrderCaseInsensitiveNested
  });

  console.log(config);

  return config;
}