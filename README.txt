Cocoglamworld - Website Management Guide
=========================================

## Quick Start

Open any `.html` file in a browser to view the website. Everything is mobile-responsive!

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
    icon: "💄",                         // Emoji icon
    description: "...",                 // Short description
    benefits: ["Benefit 1", "Benefit 2", "Benefit 3"]  // 3 benefits
}
```

**Categories Available:**
- `lips` - Lip care products
- `face` - Face care products  
- `body` - Body care products

**Example - Adding a new product:**
```javascript
{
    id: 16,
    name: "Lip Tint",
    category: "lips",
    icon: "🎨",
    description: "Lightweight tinted lip stain",
    benefits: ["Long-lasting", "Lightweight", "Natural look"]
}
```

The products will automatically appear on the products page and can be filtered by category!

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
