import { ParserPlugin } from '@babel/parser';
import { Config } from 'prettier';

export type ImportOrderParserPlugin =
    | Extract<ParserPlugin, string>
    | `[${string},${string}]`;

export interface PluginConfig {

    /**
     * Emotion Order Config Path
     * 
     * @default ''
     */
    emotionOrderConfigPath?: string;

    /**
     * Set Category Configs
     * 
     * @default false
     */
    emotionOrderSeperation?: boolean;
    
    /**
     * @default false
     */
    emotionOrderTextVisible?: boolean;
    
    /**
     * @default 'back'
     */
    emotionOrderUndefinedPosition?: 'front' | 'back';
    
    /**
     * numeric : TBD
     * @default 'alpha'
     */
    emotionOrderUndefinedSortMethod?: 'none' | 'alpha' | 'alpha-reverse' | 'length' | 'length-reverse' | 'numeric';

    /**
     * Default Category Config
     * 
     * @default false
     */
    emotionOrderDefaultCategoryEnable?: boolean;
    
    /**
     * @default 'preppend'
     */
    emotionOrderDefaultCategoryAddMode?: 'append' | 'preppend';
    
    /**
     * @default 'auto'
     */
    emotionOrderDefaultCategoryConflictPosition?: 'auto' | 'origin' | 'append' | 'prepend';
    
    /**
     * @default 'merge'
     */
    emotionOrderDefaultCategoryConflictResolution?: 'keep' | 'replace' | 'merge';
    
    /**
     * @default 'prepend'
     */
    emotionOrderDefaultCategoryStyleAddMode?: 'append' | 'preppend';
    
    /**
     * @default 'auto'
     */
    emotionOrderDefaultCategoryConflictStylePosition?: 'auto' | 'origin' | 'append' | 'prepend';
    
    /**
     * @default 'replace'
     */
    emotionOrderDefaultCategoryConflictTextResolution?: 'keep' | 'replace';
    
    /**
     * Nested Style Setting
     * 
     * @default []
     */
    emotionOrderNested?: [];

    /**
     * @default false
     */
    emotionOrderNestedSeperation?: boolean;
    
    /**
     * @default 'ascend'
     */
    emotionOrderNestedIndexSortMethod?: 'none' | 'ascend' | 'descend';
    
    /**
     * @default 'back'
     */
    emotionOrderNestedUndefinedPosition?: 'front' | 'back';
    
    /**
     * @default 'alpha'
     */
    emotionOrderNestedUndefinedSortMethod?: 'none' | 'alpha' | 'alpha-reverse' | 'length' | 'length-reverse' | 'numeric';
    
    /**
     * Case Insensitive Config
     * 
     * @default false
     */
    emotionOrderCaseInsensitiveStyle?: boolean;
    
    /**
     * @default false
     */
    emotionOrderCaseInsensitiveNested?: boolean;

    /**
     * Case Insensitive Config
     * 
     * @default ['typescript', 'jsx']
     */
    emotionOrderParserPlugins?: string[];
    
}

export type PrettierConfig = PluginConfig & Config;
