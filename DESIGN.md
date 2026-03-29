# Design System - Serenity Spa

## Pattern: Hero-Centric + Social Proof
- **Conversion**: Emotion-driven with trust elements
- **CTA**: Above fold, repeated after testimonials
- **Sections**: Hero → Services → Testimonials → Booking → Contact

## Style: Soft UI Evolution
- **Keywords**: Soft shadows, subtle depth, calming, premium feel, organic shapes
- **Best For**: Wellness, beauty, lifestyle brands, premium services
- **Performance**: Excellent | **Accessibility**: WCAG AA

## Colors

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#E8B4B8` | Soft Pink - accents, badges, highlights |
| Secondary | `#A8D5BA` | Sage Green - success, completion, nature |
| CTA | `#D4AF37` | Gold - buttons, primary actions, luxury touch |
| Background | `#FFF5F5` | Warm White - page background |
| Surface | `#FFFFFF` | Cards, modals, elevated surfaces |
| Text Primary | `#2D3436` | Charcoal - headings, main text |
| Text Secondary | `#636E72` | Muted gray - descriptions, labels |
| Border | `#FFE4E1` | Soft pink tint - dividers, borders |

## Typography

**Headings**: Cormorant Garamond (elegant, serif)
**Body**: Montserrat (clean, sans-serif)

```css
--font-heading: 'Cormorant Garamond', Georgia, serif;
--font-body: 'Montserrat', -apple-system, sans-serif;
```

## Spacing Scale (4px base)

| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 12px |
| base | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |

## Shadows (Soft UI)

```css
--shadow-sm: 0 2px 8px rgba(232, 180, 184, 0.12);
--shadow-md: 0 4px 16px rgba(232, 180, 184, 0.16);
--shadow-lg: 0 8px 32px rgba(232, 180, 184, 0.20);
--shadow-gold: 0 4px 16px rgba(212, 175, 55, 0.24);
```

## Border Radius (Organic)

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

## Transitions

- **Duration**: 200-300ms
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)
- **Hover scale**: 1.02 max
- **Active scale**: 0.98

## Key Effects

- Soft shadows with pink tint
- Smooth transitions (200-300ms)
- Gentle hover states (subtle lift)
- Glass morphism sparingly (backdrop blur 12px)

## Icons

- **NO EMOJIS** - Use SVG icons only
- **Source**: Lucide or Heroicons
- **Size**: 20px default, 24px for navigation
- **Stroke width**: 1.5px

## Components

### Buttons

**Primary (CTA)**
- Background: `#D4AF37` (Gold)
- Text: `#FFFFFF`
- Padding: 12px 24px
- Border radius: 12px
- Shadow: `shadow-gold`
- Hover: brightness 1.05, translateY -1px

**Secondary**
- Background: `#FFFFFF`
- Border: 1px solid `#FFE4E1`
- Text: `#2D3436`
- Hover: background `#FFF5F5`

### Cards

- Background: `#FFFFFF`
- Border radius: 16px
- Shadow: `shadow-md`
- Padding: 24px
- Hover: `shadow-lg`, translateY -2px

### Inputs

- Background: `#FFFFFF`
- Border: 1px solid `#FFE4E1`
- Border radius: 12px
- Padding: 14px 16px
- Focus: border-color `#D4AF37`, shadow-gold

## Accessibility

- [x] cursor-pointer on all clickable elements
- [x] Hover states with smooth transitions (200-300ms)
- [x] Light mode: text contrast 4.5:1 minimum
- [x] Focus states visible for keyboard nav
- [x] prefers-reduced-motion respected
- [x] Responsive: 375px, 768px, 1024px, 1440px

## Anti-patterns (AVOID)

- Bright neon colors
- Harsh animations
- Dark mode
- AI purple/pink gradients
- Sharp corners (use organic shapes)
- Heavy borders
