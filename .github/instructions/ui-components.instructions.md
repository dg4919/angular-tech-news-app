---
applyTo: "src/app/**/*.{ts,html}"
---

# UI Component Rules

## Buttons

- **All buttons must use Angular Material** (`mat-button`, `mat-raised-button`, `mat-flat-button`, `mat-icon-button`, etc.) — never use plain HTML `<button>` elements without a Material directive.
- **Button color must be pink**. Since Angular Material does not have a built-in `pink` palette, define a custom theme or apply inline color overrides:
  - Use `color="primary"` and map the primary palette to pink in `styles.css`, **or**
  - Apply the CSS custom property override directly on the button:
    ```html
    <button
      mat-flat-button
      style="--mdc-filled-button-container-color: #e91e8c; --mdc-filled-button-label-text-color: #fff;">
      Label
    </button>
    ```
- Import `MatButtonModule` in every standalone component that renders a button:
  ```ts
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule];
  ```
- Do **not** use Bootstrap, custom CSS classes, or bare `<button>` tags as replacements.
