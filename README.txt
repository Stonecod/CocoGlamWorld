Cocoglamworld - Website Management Guide
=========================================

## Quick Start

Open any `.html` file in a browser to view the website. Everything is mobile-responsive!

**Using product images:**
You can keep the emoji placeholders until you're ready to add real photos. To display an image, edit the product entry in `products-data.js` and set `imageUrl` to the relative path (e.g. `"images/lipgloss.jpg"`). If the field is empty, the emoji defined in `icon` will appear instead.

**Formspree integration:**
Forms (newsletter and order) are preconfigured with example Formspree endpoints. Replace `YOUR_FORM_ID` in the form `action` attributes with your actual Formspree ID to start receiving submissions via email.  

To use Formspree:
1. Sign up at https://formspree.io and create a new form.
2. Copy the provided form ID (looks like `xqednlyq` or similar).
3. Paste the ID into the `action` attribute of both forms in `index.html` and `products.html`.
4. Optionally customize the success message via Formspree dashboard or add a redirect URL.

Once configured, your newsletter subscriptions and order inquiries will arrive directly in your inbox without needing any backend code.

---

## HOW TO UPDATE THE WEBSITE

### 1. UPDATING PRODUCTS (EASIEST WAY)
All products are stored in a single file: `products-data.js`

**To add/edit/remove products:**
1. Open `products-data.js`
2. Find the `productsData = [` section
3. Add, edit, or delete products in the list

**Product Structure:**
```javascript
{
    id: 1,                              // Unique number
    name: "Lip Gloss",                  // Product name
    category: "lips",                   // lips, face, or body
    icon: "💄",                         // Emoji icon (used if imageUrl empty)
    imageUrl: "",                      // optional path to product photo
    price: 0,                            // numeric price (update before launching)
    description: "...",                 // Short description
    benefits: ["Benefit 1", "Benefit 2", "Benefit 3"]  // 3 benefits
}
```

**Categories & Current Layout:**
- Only `lips` is used now – the site showcases a lip‑gloss-only collection.

Each product in `products-data.js` will appear as a shade card on the products page. Be sure to include a `swatch` field (hex code or colour name) if you want a colour circle shown under the name.

**Example – shade with swatch:**
```javascript
{
    id: 6,
    name: "Coral Kiss",
    category: "lips",
    swatch: "#FF6F61",
    imageUrl: "images/coral-kiss.jpg",
    price: 1350,
    description: "Vibrant coral shade with intense shine.",
    benefits: ["Hydrating", "Long-lasting", "Cruelty-free"]
}
```

The grid no longer includes category filters; all items are displayed together. Order forms have been removed from the public listing, but price logic still works if you decide to re-enable the form.

* When customers request an order via Formspree, they can specify product and quantity. The `price` field is used client‑side to calculate totals, so keep it accurate.

---

### 2. CHANGING HOMEPAGE CONTENT

**Header/Title:**
- Edit: `index.html` → Find `<section class="hero">`
- Change the `<h1>` and tagline

**About Section:**
- Edit: `index.html` → Find `<section class="about">`
- Change the paragraph text

**Features Section:**
- Edit: `index.html` → Find `<section class="features">`
- Update each feature card with new icon and text

**Services Section:**
- Edit: `index.html` → Find `<section class="services">`
- Add/edit service cards

**Testimonials:**
- Edit: `index.html` → Find `<section class="testimonials">`
- Add/edit customer reviews

---

### 3. UPDATING COLORS & STYLING

**Primary Colors:**
- Edit: `style.css` → Find `:root` at the top
- Change these CSS variables:
  - `--primary-color: #f7c6d0;` (Main pink)
  - `--secondary-color: #5a1a2c;` (Dark wine)
  - `--light-bg: #fff7f9;` (Light background)
  - `--accent-color: #ffe4ea;` (Accent pink)

**Font Sizes:**
- Find the specific section in CSS (e.g., `.hero h1 { font-size: }`)
- Adjust the pixel values

---

### 4. UPDATING NAVIGATION LINKS

**Add new page:**
1. Create a new HTML file (e.g., `contact.html`)
2. Edit all HTML files
3. In the `<nav>` section, add a new `<li>`:
   ```html
   <li><a href="contact.html">Contact</a></li>
   ```

**Update footer links:**
- Edit all HTML files → Find `<footer>`
- Update the Quick Links section

---

### 5. FILE STRUCTURE

```
COCOGLAMWORLD/
├── index.html           ← Homepage
├── products.html        ← Products page
├── style.css           ← All styling (colors, layouts)
├── script.js           ← All interactivity (mobile menu, filters)
├── products-data.js    ← ALL PRODUCT DATA (edit this to update products!)
└── README.txt          ← This file
```

---

## COMMON TASKS

### Adding Contact Info
Add to footer before `</footer>` in all HTML files:
```html
<div class="footer-section">
    <h4>Contact</h4>
    <p>📞 +234 XXX XXX XXXX</p>
    <p>📧 info@cocoglamworld.com</p>
    <p>📍 Your Address Here</p>
</div>
```

### Adding Social Media Links
Edit footer → Find `<a href="#">Facebook</a>`
Change to: `<a href="https://facebook.com/yourpage">Facebook</a>`

### Changing Logo/Brand Name
Search for "Cocoglamworld" in all HTML files and replace

### Adding a New Section
1. Add the HTML to `index.html`
2. Add CSS styling to `style.css` for the new section
3. Add JavaScript if needed to `script.js`

---

## TIPS FOR EASY MAINTENANCE

✓ Keep `products-data.js` organized - that's your product database
✓ Use the same color variables - makes bulk color changes easy
✓ Copy similar sections to maintain consistent styling
✓ Test on mobile after making changes (use browser DevTools)
✓ Keep file names simple and lowercase

---

## When Ready to Add Backend Features

When you learn backend development:
- Replace products-data.js with a database connection
- Add shopping cart functionality
- Add user accounts
- Add payment processing
- Add admin panel for easy management

For now, this static site is perfect and very easy to update!

---

Questions? Check the folder structure and file names. Everything is well-organized!
