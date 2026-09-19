const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Text justify
html = html.replace(/p { text-align: justify;/g, 'p { text-align: justify !important;');
html = html.replace(/textarea {/g, 'textarea { text-align: justify;');
html = html.replace(/\.print-mirror {/g, '.print-mirror { text-align: justify !important;');

// 2. Counterclockwise rotation
html = html.replace(/ctx\.rotate\(\(90 \* Math\.PI\) \/ 180\);/, 'ctx.rotate((-90 * Math.PI) / 180);');
html = html.replace(/Rotate 90°/g, 'Rotate -90°');

// 3. Print colors and sizes for vital-check
html = html.replace(/\.anc-visit-table .vital-check,\s*input\.vital-check {[\s\S]*?margin: 0 auto !important;\s*}/g, 
`.anc-visit-table .vital-check,
input.vital-check {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
  border-radius: 2px !important;
  background-color: transparent !important;
  color: #000 !important;
  font-weight: 800 !important;
  padding: 1px !important;
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
  text-align: center !important;
  font-size: 8.5pt !important;
  white-space: nowrap !important;
  overflow: visible !important;
}`);

// Add white-space: nowrap to vital check print-mirrors if needed, but wait they are NOT replaced!
// In our print logic, input[type=number] is not replaced by print-mirror. So this CSS is for the input directly.

// 4. Form 2 Numbering (just make sure 10, 11, 12, 13, 14/15 are perfectly sequential visually in HTML)
// Actually they are sequential in the HTML, so nothing to fix there structurally.
// Just to be safe, I'll change "<h4>11. Immunization Status</h4>" to a div block so it looks like the rest.
html = html.replace(/<h4>11\. Immunization Status<\/h4>/g, '<div class="field-group"><label style="font-size: 1.1rem;">11. Immunization Status</label></div>');

// 5. Landscape Print Page
// Add to print css
html = html.replace(/@media print \{/, `@media print {
      @page landscape-page { size: landscape; }
      .preview-item.is-landscape { page: landscape-page; max-width: 100% !important; }
      .preview-item.is-landscape img { max-height: 18cm !important; max-width: 26cm !important; }
`);

// Add class in JS
html = html.replace(/img\.src = itemData\.src;/g, 
`img.src = itemData.src;
        img.onload = function() {
          if (img.naturalWidth > img.naturalHeight) {
            item.classList.add('is-landscape');
          }
        };`);

// If addMediaToUI creates temp img:
html = html.replace(/img\.src = src;/, 
`img.src = src;
    img.onload = function() {
      if (img.naturalWidth > img.naturalHeight) {
        wrapper.classList.add('is-landscape');
      }
    };`);

// 6. Update btn-rotate to call rotateMediaItem properly (it already does)

fs.writeFileSync('index.html.mod', html);
