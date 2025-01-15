import { Card, CardBody, CardHeader, Code, Divider, Spinner } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

import { CopyButton } from "./CopyButton";

export const CodePreview = ({ code, title }: { code: string; title: string }) => {
  const [html, setHTML] = useState<string>();

  const { theme } = useTheme();

  useEffect(() => {
    codeToHtml(code, { lang: "js", theme: theme === "light" || !theme ? "github-light" : "github-dark" }).then((html) => {
      setHTML(html);
    });
  }, [theme, code]);

  return (
    <Card>
      <CardHeader>
        <Code>{title}</Code>
        <div className="flex-1" />
        <CopyButton code={code} />
      </CardHeader>
      <Divider />
      <CardBody>{html ? <div className="max-h-[40vh] overflow-auto" dangerouslySetInnerHTML={{ __html: html }} /> : <Spinner />}</CardBody>
    </Card>
  );
};
