
A [Prettier v3+](https://prettier.io/) plugin for Emotion v11.0+ that automatically sorts classes based on selectable [recommended class order]().

## Introduction

blah blah
### Input
### Output

<details>
  <summary>첫번째토글</summary>
  asd
</details>


object style : 1.1.0+
- default style : 1.1.0+
- nested style : 1.1.0+
- etc(..., &&, ?:) : 1.1.0+
css style : TBD
css-in-js : TBD

list by regex : TBD

applied Project : 
add ?

Contributiors
add ? 

## Index
 <!-- omit in toc -->

- [Sample](#sample)
  - [Input](#input)
  - [Output](#output)
- [Install](#installation)
- [Usage](#usage)
  - [How does import sort work?](#how-does-import-sort-work)
  - [Options](#options)
    - [`importOrder`](#importorder)
      - [1. Put specific dependencies at the top](#1-put-specific-dependencies-at-the-top)
      - [2. Keep css modules at the bottom](#2-keep-css-modules-at-the-bottom)
      - [3. Add spaces between import groups](#3-add-spaces-between-import-groups)
      - [4. Group type imports separately from values](#4-group-type-imports-separately-from-values)
      - [5. Group aliases with local imports](#5-group-aliases-with-local-imports)
      - [6. Enforce a blank line after top of file comments](#6-enforce-a-blank-line-after-top-of-file-comments)
      - [7. Enable/disable plugin or use different order in certain folders or files](#7-enabledisable-plugin-or-use-different-order-in-certain-folders-or-files)
    - [`importOrderTypeScriptVersion`](#importordertypescriptversion)
    - [`importOrderParserPlugins`](#importorderparserplugins)
    - [`importOrderCaseSensitive`](#importordercasesensitive)
  - [Prevent imports from being sorted](#prevent-imports-from-being-sorted)
  - [Comments](#comments)
- [FAQ / Troubleshooting](#faq--troubleshooting)
- [Compatibility](#compatibility)
- [Contribution](#contribution)
- [Disclaimer](#disclaimer)


## Installation

To get started, install `prettier-plugin-emotion-order` as a dev-dependency:

```sh
npm install -D prettier prettier-plugin-emotion-order
```

Then add the plugin to your [Prettier configuration](https://prettier.io/docs/en/configuration.html):

```json5
// .prettierrc
{
  "plugins": ["prettier-plugin-emotion-order"]
}
```

## Usage
add .emotionorderrc to project root directory

e.g.

## Options
type, default value, 옵션별 e.g.
  ### .prettierrc

	"emotionOrderConfigPath": ".emotionorderrc",
	"emotionOrderSeperation": true,
	"emotionOrderTextVisible": true,
	"emotionOrderUndefinedPosition": "back",
	"emotionOrderUndefinedSortMethod": "alpha",

	"emotionOrderDefaultCategoryEnable": true,
	"emotionOrderDefaultCategoryAddMode": "append",
	"emotionOrderDefaultCategoryConflictPosition": "auto",
	"emotionOrderDefaultCategoryConflictResolution": "merge",
	"emotionOrderDefaultCategoryStyleAddMode": "prepend",
	"emotionOrderDefaultCategoryConflictStylePosition": "auto",
	"emotionOrderDefaultCategoryConflictTextResolution": "replace",

	"emotionOrderNestedSeperation": true,
	"emotionOrderNestedIndexSortMethod": "ascend",
	"emotionOrderNestedUndefinedPosition": "front",
	"emotionOrderNestedUndefinedSortMethod": "alpha",

	"emotionOrderCaseInsensitiveStyle": false,
	"emotionOrderCaseInsensitiveNested": true,

  ### .emotionorderrc

## FAQ / Troubleshooting