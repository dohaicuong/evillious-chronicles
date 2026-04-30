import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@src/components/primitives/button";
import { Menu } from "@src/components/primitives/menu";

export const Route = createLazyFileRoute("/components/menu")({
  component: MenuPage,
});

const sins = ["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy"] as const;

function MenuPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Menu</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Dropdown menus for sort, filter, and action lists. Headless via Base UI, themed to match
          dialogs and toasts.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Default — Library Sort</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Menu>
            <Menu.Trigger render={<Button variant="ghost">Sort</Button>} />
            <Menu.Portal>
              <Menu.Positioner sideOffset={6}>
                <Menu.Popup>
                  <Menu.Item>Title (A &rarr; Z)</Menu.Item>
                  <Menu.Item>Recently read</Menu.Item>
                  <Menu.Item>Recently added</Menu.Item>
                  <Menu.Separator />
                  <Menu.Group>
                    <Menu.GroupLabel>By Sin</Menu.GroupLabel>
                    {sins.map((sin) => (
                      <Menu.Item key={sin} className="capitalize">
                        {sin}
                      </Menu.Item>
                    ))}
                  </Menu.Group>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu>
        </div>
      </section>

      <section className="flex flex-col gap-4" data-sin="pride">
        <h2 className="text-style-eyebrow text-fg-muted">Sin Theme &mdash; Pride</h2>
        <p className="text-style-body text-fg-muted">
          The menu portals to the document root, so the popup escapes the <code>data-sin</code>{" "}
          cascade. Wrap the popup contents in an inner <code>data-sin</code> div with{" "}
          <code>className=&quot;contents&quot;</code> so the highlighted-state accent picks up the
          Pride yellow.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Menu>
            <Menu.Trigger render={<Button variant="primary">Riliane's Decrees</Button>} />
            <Menu.Portal>
              <Menu.Positioner sideOffset={6}>
                <Menu.Popup>
                  <div data-sin="pride" className="contents">
                    <Menu.Item>Brioche for breakfast</Menu.Item>
                    <Menu.Item>Burn the Green Country</Menu.Item>
                    <Menu.Item>Summon the swordsman</Menu.Item>
                    <Menu.Separator />
                    <Menu.Group>
                      <Menu.GroupLabel>Court</Menu.GroupLabel>
                      <Menu.Item>Allen</Menu.Item>
                      <Menu.Item>Chartette</Menu.Item>
                    </Menu.Group>
                  </div>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">With Disabled Item</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Menu>
            <Menu.Trigger render={<Button variant="outline">Actions</Button>} />
            <Menu.Portal>
              <Menu.Positioner sideOffset={6}>
                <Menu.Popup>
                  <Menu.Item>Open</Menu.Item>
                  <Menu.Item>Bookmark</Menu.Item>
                  <Menu.Item disabled>Delete (locked)</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu>
        </div>
      </section>
    </div>
  );
}
