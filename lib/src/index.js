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
var babel_1 = require("prettier/plugins/babel");
var flow_1 = require("prettier/plugins/flow");
var html_1 = require("prettier/plugins/html");
var typescript_1 = require("prettier/plugins/typescript");
var default_processor_1 = require("@jadest/prettier-plugin-sort-imports/lib/src/utils/utils/preprocessors/default-processor");
var svelte_preprocessor_1 = require("@jadest/prettier-plugin-sort-imports/lib/src/utils/utils/preprocessors/svelte-preprocessor");
var vue_preprocessor_1 = require("@jadest/prettier-plugin-sort-imports/lib/src/utils/utils/preprocessors/vue-preprocessor");
var create_svelte_parsers_1 = require("./utils/utils/create-svelte-parsers");
var svelteParsers = (0, create_svelte_parsers_1.createSvelteParsers)();
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
    parsers: __assign({ babel: __assign(__assign({}, babel_1.parsers.babel), { preprocess: default_processor_1.defaultPreprocessor }), flow: __assign(__assign({}, flow_1.parsers.flow), { preprocess: default_processor_1.defaultPreprocessor }), typescript: __assign(__assign({}, typescript_1.parsers.typescript), { preprocess: default_processor_1.defaultPreprocessor }), vue: __assign(__assign({}, html_1.parsers.vue), { preprocess: vue_preprocessor_1.vuePreprocessor }) }, (svelteParsers.parsers
        ? {
            svelte: __assign(__assign({}, svelteParsers.parsers.svelte), { preprocess: svelte_preprocessor_1.sveltePreprocessor }),
        }
        : {})),
    options: options,
};
