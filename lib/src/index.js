"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
const _babel = require("prettier/plugins/babel");
const _flow = require("prettier/plugins/flow");
const _html = require("prettier/plugins/html");
const _typescript = require("prettier/plugins/typescript");
const _default_processor = require("prettier-plugin-emotion-order/lib/src/utils/preprocessors/default-processor");
const _svelte_preprocessor = require("prettier-plugin-emotion-order/lib/src/utils/preprocessors/svelte-preprocessor");
const _vue_preprocessor = require("prettier-plugin-emotion-order/lib/src/utils/preprocessors/vue-preprocessor");
const _create_svelte_parsers = require("prettier-plugin-emotion-order/lib/src/utils/parsers/create-svelte-parsers");
const svelteParsers = (0, _create_svelte_parsers.createSvelteParsers)();
var options = {
    emotionOrderConfigPath: {
        type: 'path',
        category: 'Global',
        default: '',
        description: "Choose the formatting style",
    },
    // Category
    emotionOrderSeperation: {
        type: 'boolean',
        category: 'Global',
        default: [{ value: false }],
        description: 'Provide an order to sort imports.',
    },
    emotionOrderTextVisible: {
        type: 'boolean',
        category: 'Global',
        default: [{ value: false }],
        description: 'Provide an order to sort imports.',
    },
    emotionOrderUndefinedPosition: {
        type: 'choice',
        category: 'Global',
        default: 'back',
        choices: [{value: 'front'}, {value: 'back'}],
    },
    emotionOrderUndefinedSortMethod: {
        type: 'choice',
        category: 'Global',
        default: 'alpha',
        choices: [{value: 'none'}, {value: 'alpha'}, {value: 'alpha-reverse'}, {value: 'length'}, {value: 'length-reverse'}],
    },
    // DefaultCategory
    emotionOrderDefaultCategoryEnable: {
        type: 'boolean',
        category: 'Global',
        default: false,
        description: 'Provide an order to sort imports.',
    },
    emotionOrderDefaultCategoryAddMode: {
        type: 'choice',
        category: 'Global',
        default: 'preppend',
        choices: [{value: 'append'}, {value: 'preppend'}],
    },
    emotionOrderDefaultCategoryConflictPosition: {
        type: 'choice',
        category: 'Global',
        default: 'auto',
        choices: [{value: 'auto'}, {value: 'origin'}, {value: 'append'}, {value: 'prepend'}],
    },
    emotionOrderDefaultCategoryConflictResolution: {
        type: 'choice',
        category: 'Global',
        default: 'merge',
        choices: [{value: 'keep'}, {value: 'replace'}, {value: 'merge'}],
    },
    emotionOrderDefaultCategoryStyleAddMode: {
        type: 'choice',
        category: 'Global',
        default: 'prepend',
        choices: [{value: 'append'}, {value: 'prepend'}],
    },
    emotionOrderDefaultCategoryConflictStylePosition: {
        type: 'choice',
        category: 'Global',
        default: 'auto',
        choices: [{value: 'auto'}, {value: 'origin'}, {value: 'append'}, {value: 'prepend'}],
    },
    emotionOrderDefaultCategoryConflictTextResolution: {
        type: 'choice',
        category: 'Global',
        default: 'replace',
        choices: [{value: 'keep'}, {value: 'replace'}],
    },
    // Nested
    emotionOrderNestedSeperation: {
        type: 'boolean',
        category: 'Global',
        default: [{ value: false }],
        description: 'Provide an order to sort imports.',
    },
    emotionOrderNestedIndexSortMethod: {
        type: 'choice',
        category: 'Global',
        default: 'ascend',
        choices: [{value: 'none'}, {value: 'ascend'}, {value: 'descend'}],
    },
    emotionOrderNestedUndefinedPosition: {
        type: 'choice',
        category: 'Global',
        default: 'back',
        choices: [{value: 'front'}, {value: 'back'}],
    },
    emotionOrderNestedUndefinedSortMethod: {
        type: 'choice',
        category: 'Global',
        default: 'alpha',
        choices: [{value: 'none'}, {value: 'alpha'}, {value: 'alpha-reverse'}, {value: 'length'}, {value: 'length-reverse'}],
    },
    // Case Insensitive Config
    emotionOrderCaseInsensitiveStyle: {
        type: 'boolean',
        category: 'Global',
        default: [{ value: false }],
        description: 'Provide an order to sort imports.',
    },
    emotionOrderCaseInsensitiveNested: {
        type: 'boolean',
        category: 'Global',
        default: [{ value: false }],
        description: 'Provide an order to sort imports.',
    },
    // Parser Plugins
    emotionOrderParserPlugins: {
        type: 'path',
        category: 'Global',
        array: true,
        // By default, we add ts and jsx as parsers but if users define something
        // we take that option
        default: [{ value: ['typescript', 'jsx'] }],
        description: 'Provide a list of plugins for special syntax',
    },
};

module.exports = {
    parsers: __assign({ babel: __assign(__assign({}, _babel.parsers.babel), { preprocess: _default_processor.defaultPreprocessor }), flow: __assign(__assign({}, _flow.parsers.flow), { preprocess: _default_processor.defaultPreprocessor }), typescript: __assign(__assign({}, _typescript.parsers.typescript), { preprocess: _default_processor.defaultPreprocessor }), vue: __assign(__assign({}, _html.parsers.vue), { preprocess: _vue_preprocessor.vuePreprocessor }) }, (svelteParsers.parsers
        ? {
            svelte: __assign(__assign({}, svelteParsers.parsers.svelte), { preprocess: _svelte_preprocessor.sveltePreprocessor }),
        }
        : {})),
    options: options,
};
