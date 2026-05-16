```scope
Select
```

# Select

Form-control select for choosing one value from a known list. Trigger mirrors `Input`'s border / sizing / focus tokens; the popup borrows `Menu`'s surface so dropdowns across the app feel like a single family. Auto-themes inside `data-sin` wrappers — the chevron, focus ring, highlight, and check indicator all retint via the `--accent` cascade.

```tsx preview
() => {
  const [value, setValue] = useState("af_heart");
  const items = [
    { value: "af_heart", label: "Heart (American Female)" },
    { value: "am_adam", label: "Adam (American Male)" },
    { value: "bf_emma", label: "Emma (British Female)" },
  ];
  return (
    <div className="w-full max-w-xs">
      <Select value={value} onValueChange={setValue} items={items}>
        <Select.Trigger>
          <Select.Value placeholder="Choose a voice" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              <Select.List>
                {items.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    <Select.ItemIndicator />
                    <Select.ItemText>{item.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select>
    </div>
  );
};
```

## Anatomy

The design-system wrapper exposes every part Base UI ships with the same names — `Root` is the default export (`Select`), and everything else is a static property.

```tsx
import { Select } from "@src/components/primitives/select";

<Select value={value} onValueChange={setValue}>
  <Select.Trigger>
    <Select.Value placeholder="…" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.List>
          <Select.Item value="…">
            <Select.ItemIndicator />
            <Select.ItemText>…</Select.ItemText>
          </Select.Item>
        </Select.List>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select>;
```

`Trigger` auto-renders the chevron `Icon` so consumers don't have to compose it manually. `ItemIndicator` ships the check mark; render it inside every `Item` for the selected-row affordance.

### Showing the label in the trigger

By default `Select.Value` displays the raw `value` of the picked item — e.g. you'd see `am_adam` in the trigger, not "Adam (American Male)". Pass an `items` prop on the root and base-ui resolves the value to its label automatically:

```tsx
const items = [
  { value: "af_heart", label: "Heart" },
  { value: "am_adam", label: "Adam" },
];

<Select value={value} onValueChange={setValue} items={items}>
  <Select.Trigger>
    <Select.Value placeholder="Choose…" />
  </Select.Trigger>
  …
</Select>;
```

For custom rendering of the picked label (icons, colors, formatting), use `Select.Value`'s render-prop form instead:

```tsx
<Select.Value>{(v) => <span className="capitalize">{v}</span>}</Select.Value>
```

## Examples

### Sizes

`Trigger` accepts `size="sm" | "md" (default) | "lg"`, matching the `Input` size scale so the two compose at the same height in a form row.

```tsx preview
() => {
  const [a, setA] = useState("sm");
  const [b, setB] = useState("md");
  const [c, setC] = useState("lg");
  const items = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
  ];
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      {[
        { size: "sm", v: a, set: setA },
        { size: "md", v: b, set: setB },
        { size: "lg", v: c, set: setC },
      ].map(({ size, v, set }) => (
        <Select key={size} value={v} onValueChange={set} items={items}>
          <Select.Trigger size={size}>
            <Select.Value />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.List>
                  {items.map((item) => (
                    <Select.Item key={item.value} value={item.value}>
                      <Select.ItemIndicator />
                      <Select.ItemText>{item.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select>
      ))}
    </div>
  );
};
```

### Grouped options

Use `Select.Group` + `Select.GroupLabel` to section a long list (e.g. voices by accent + gender). The group label inherits the eyebrow style.

```tsx preview
() => {
  const [value, setValue] = useState("af_heart");
  const items = [
    { value: "af_heart", label: "Heart" },
    { value: "am_adam", label: "Adam" },
    { value: "bf_emma", label: "Emma" },
    { value: "bm_daniel", label: "Daniel" },
  ];
  return (
    <div className="w-full max-w-xs">
      <Select value={value} onValueChange={setValue} items={items}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              <Select.List>
                <Select.Group>
                  <Select.GroupLabel>American</Select.GroupLabel>
                  <Select.Item value="af_heart">
                    <Select.ItemIndicator />
                    <Select.ItemText>Heart</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="am_adam">
                    <Select.ItemIndicator />
                    <Select.ItemText>Adam</Select.ItemText>
                  </Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group>
                  <Select.GroupLabel>British</Select.GroupLabel>
                  <Select.Item value="bf_emma">
                    <Select.ItemIndicator />
                    <Select.ItemText>Emma</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="bm_daniel">
                    <Select.ItemIndicator />
                    <Select.ItemText>Daniel</Select.ItemText>
                  </Select.Item>
                </Select.Group>
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select>
    </div>
  );
};
```

### Disabled

```tsx preview
<div className="w-full max-w-xs">
  <Select defaultValue="one" disabled items={[{ value: "one", label: "Disabled" }]}>
    <Select.Trigger>
      <Select.Value />
    </Select.Trigger>
    <Select.Portal>
      <Select.Positioner>
        <Select.Popup>
          <Select.List>
            <Select.Item value="one">
              <Select.ItemIndicator />
              <Select.ItemText>Disabled</Select.ItemText>
            </Select.Item>
          </Select.List>
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  </Select>
</div>
```

### Per-sin themes

Drop the select inside a `data-sin` wrapper and the chevron rotation, focus halo, item highlight, and check indicator all flip to the sin's accent token.

```tsx preview
() => {
  const [value, setValue] = useState("one");
  const items = [
    { value: "one", label: "Pride-tinted" },
    { value: "two", label: "Option two" },
  ];
  return (
    <div data-sin="pride" className="w-full max-w-xs">
      <Select value={value} onValueChange={setValue} items={items}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              <Select.List>
                {items.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    <Select.ItemIndicator />
                    <Select.ItemText>{item.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select>
    </div>
  );
};
```
