import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@src/components/primitives/button";
import { Link } from "@src/components/primitives/link";
import { ComponentDoc, type DocScope } from "@src/components/docs/component-doc";

export const Route = createLazyFileRoute("/components/button")({
  component: ButtonPage,
});

const scope: DocScope = { Button, Link };

function ButtonPage() {
  return <ComponentDoc path="design-system/components/button.md" scope={scope} />;
}
