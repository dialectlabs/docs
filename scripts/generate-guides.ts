import fs from "fs";
import path from "path";
import { glob } from "glob";

// Function to get guide files from a specific directory
function getGuides(pattern: string) {
  return glob
    .sync(pattern)
    .sort((a, b) => a.localeCompare(b)) // Sort the files in ascending order
    .map((file) => {
      const content = fs.readFileSync(file, "utf-8");
      const title = content.match(/# (.*)/)?.[1] || path.basename(file, ".md");
      return {
        path: file.replace("docs/", ""),
        title,
      };
    });
}

// Generate the guides page content
function generateGuidesPage() {
  const clientGuides = getGuides("docs/blinks-client/guides/*.md");
  const providerGuides = getGuides("docs/blinks-provider/guides/*.md");

  const content = `---
title: Guides
description: Overview of all Dialect guides
---

# Guides

## Blinks Client Guides

${clientGuides.map((guide) => `- [${guide.title}](${guide.path})`).join("\n")}

## Blinks Provider Guides

${providerGuides.map((guide) => `- [${guide.title}](${guide.path})`).join("\n")}
`;

  fs.writeFileSync("docs/guides.md", content);
}

generateGuidesPage();
