import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

// Helper function to normalize code indentation
function normalizeCodeIndentation(code: string | undefined | null): string {
    if (!code) return '';
    const lines = code.split("\n");
    let minIndent = Infinity;
    for (const line of lines) {
        const trimmedLine = line.trimStart();
        if (trimmedLine.length === 0) continue;
        const indent = line.length - trimmedLine.length;
        if (indent < minIndent) {
            minIndent = indent;
        }
    }
    if (minIndent < Infinity && minIndent > 0) {
        return lines
            .map((line) => {
                if (line.trimStart().length === 0) return line.trimStart();
                return line.slice(Math.min(minIndent, line.length - line.trimStart().length));
            })
            .join("\n");
    }
    return code;
}

// Helper function to convert object to URL parameters
function objectToUrlParams(params: Record<string, any> | undefined): string {
    if (!params) return '';
    return new URLSearchParams(params as Record<string, string>).toString();
}

interface ApiCodeTabsProps {
    title?: string;
    getUrl?: string;
    postUrl?: string;
    getParams?: Record<string, any>;
    postParams?: Record<string, any>;
    postBody?: Record<string, any>;
}

export default function ApiCodeTabs({
    title = "API Endpoints",
    getUrl,
    postUrl,
    getParams,
    postParams,
    postBody,
}: ApiCodeTabsProps) {
    // Generate cURL commands
    const getCurlCommand = getUrl ?
        `curl "${getUrl}${getParams ? '?' + objectToUrlParams(getParams) : ''}"` : '';

    const postCurlCommand = postUrl ?
        `curl -X POST "${postUrl}${postParams ? '?' + objectToUrlParams(postParams) : ''}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(postBody || {}, null, 2)}'` : '';

    // Generate JavaScript fetch code
    const getTypeScriptCode = getUrl ?
        `const response = await fetch('${getUrl}${getParams ? '?' + objectToUrlParams(getParams) : ''}');
const data = await response.json();` : '';

    const postTypeScriptCode = postUrl ?
        `const response = await fetch('${postUrl}${postParams ? '?' + objectToUrlParams(postParams) : ''}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${JSON.stringify(postBody || {}, null, 2)})
});
const data = await response.json();` : '';

    const curlCode = [getCurlCommand, postCurlCommand].filter(Boolean).join('\n\n');
    const typeScriptCode = [getTypeScriptCode, postTypeScriptCode].filter(Boolean).join('\n\n');

    return (
        <Tabs>
            <TabItem value="curl" label="cURL">
                <CodeBlock language="bash">{normalizeCodeIndentation(curlCode)}</CodeBlock>
            </TabItem>
            <TabItem value="typescript" label="JavaScript">
                <CodeBlock language="typescript">{normalizeCodeIndentation(typeScriptCode)}</CodeBlock>
            </TabItem>
        </Tabs>
    );
} 