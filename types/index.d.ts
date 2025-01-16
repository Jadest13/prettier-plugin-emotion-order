import { ParserPlugin } from '@babel/parser';
import { Config } from 'prettier';

export type ImportOrderParserPlugin =
    | Extract<ParserPlugin, string>
    | `[${string},${string}]`;

export interface PluginConfig {
    emotionStyledOrder: string[];
    emotionStyledOrderParserPlugins?: ImportOrderParserPlugin[];
}

export type PrettierConfig = PluginConfig & Config;
