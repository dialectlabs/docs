// Renders a code block with the npm and yarn commands to install the package

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

export default function InstallPackages({
  packageName,
}: {
  packageName: string;
}) {
  const npmCommand = `npm i ${packageName}`;
  const yarnCommand = `yarn add ${packageName}`;

  return (
    <Tabs>
      <TabItem value="npm" label="npm">
        <CodeBlock language="bash">{npmCommand}</CodeBlock>
      </TabItem>
      <TabItem value="yarn" label="yarn">
        <CodeBlock language="bash">{yarnCommand}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}
