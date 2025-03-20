import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

// Helper function to normalize code indentation
function normalizeCodeIndentation(code: string): string {
  // Split the code into lines
  const lines = code.split("\n");

  // Find the minimum indentation (excluding empty lines)
  let minIndent = Infinity;
  for (const line of lines) {
    const trimmedLine = line.trimStart();
    if (trimmedLine.length === 0) continue; // Skip empty lines

    const indent = line.length - trimmedLine.length;
    if (indent < minIndent) {
      minIndent = indent;
    }
  }

  // Remove the common indentation from all lines
  if (minIndent < Infinity && minIndent > 0) {
    return lines
      .map((line) => {
        if (line.trimStart().length === 0) return line.trimStart(); // Keep empty lines empty
        return line.slice(Math.min(minIndent, line.length - line.trimStart().length));
      })
      .join("\n");
  }

  return code;
}

export default function PlatformCodeTabs({
  androidCode,
  iosCode,
  webCode,
  androidLanguage = "kotlin",
  iosLanguage = "swift",
  webLanguage = "javascript",
}: {
  androidCode: string;
  iosCode: string;
  webCode: string;
  androidLanguage?: string;
  iosLanguage?: string;
  webLanguage?: string;
}) {
  // Normalize the indentation for each code snippet
  const normalizedAndroidCode = normalizeCodeIndentation(androidCode);
  const normalizedIosCode = normalizeCodeIndentation(iosCode);
  const normalizedWebCode = normalizeCodeIndentation(webCode);

  return (
    <Tabs>
      <TabItem value="android" label="Android">
        <CodeBlock language={androidLanguage}>{normalizedAndroidCode}</CodeBlock>
      </TabItem>
      <TabItem value="ios" label="iOS">
        <CodeBlock language={iosLanguage}>{normalizedIosCode}</CodeBlock>
      </TabItem>
      <TabItem value="web" label="Web">
        <CodeBlock language={webLanguage}>{normalizedWebCode}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}
