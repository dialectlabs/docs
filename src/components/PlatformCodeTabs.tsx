import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

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
  return (
    <Tabs>
      <TabItem value="android" label="Android">
        <CodeBlock language={androidLanguage}>{androidCode}</CodeBlock>
      </TabItem>
      <TabItem value="ios" label="iOS">
        <CodeBlock language={iosLanguage}>{iosCode}</CodeBlock>
      </TabItem>
      <TabItem value="web" label="Web">
        <CodeBlock language={webLanguage}>{webCode}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}
