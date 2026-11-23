export interface McpResourceDoc {
    uri: string;
    name: string;
    description: string;
    mimeType: string;
    text: string;
}
export declare const RESOURCES: McpResourceDoc[];
export declare function getResource(uri: string): McpResourceDoc | undefined;
