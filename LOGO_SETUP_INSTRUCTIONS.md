# How to Add Your JTMSI Logo

## Steps to Replace the Logo:

1. **Save your logo image:**
   - Save the JTMSI logo image you provided as `logo.png`
   - Make sure it's a PNG format for best quality with transparency

2. **Replace the existing logo file:**
   - Navigate to: `c:\Users\james\OneDrive\Desktop\GIT\jtmsi_website\src\`
   - Replace the existing `logo.png` file with your JTMSI logo image
   - Keep the filename as `logo.png`

3. **Logo specifications:**
   - Recommended size: 200x200 pixels or higher (square format works best)
   - Format: PNG with transparent background (if needed)
   - The CSS is already configured to display it as a 50x50px circular logo

## Current Logo Setup:
- The website is already configured to use `logo.png`
- The logo will have a subtle bounce animation
- It includes hover effects with shadow
- Responsive design is included for mobile devices

## Alternative Method:
If you want to use a different filename:
1. Save your logo with any name (e.g., `jtmsi-logo.png`)
2. Update the import in `src/App.js` line 3:
   ```javascript
   import logo from './jtmsi-logo.png';
   ```

The logo will automatically appear in the header with the company name "Jeannies Touch Manpower Services Inc."
