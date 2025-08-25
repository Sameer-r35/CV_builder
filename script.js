document.addEventListener("DOMContentLoaded", () => {
  // ===== Landing Page: Testimonials Toggle =====
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  const hiddenTestimonials = document.querySelector(".hidden-testimonials");

  if (seeMoreBtn && hiddenTestimonials) {
    seeMoreBtn.addEventListener("click", () => {
      hiddenTestimonials.classList.toggle("show");
      seeMoreBtn.textContent = hiddenTestimonials.classList.contains("show") ? "See Less" : "See More";
    });
  }

  // ===== CV Builder Page: Live Preview & PDF Download =====
  const cvPreview = document.getElementById("cv-preview");
  const downloadBtn = document.getElementById("download-btn");

  if (cvPreview && downloadBtn) {
    // Input elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const summaryInput = document.getElementById('summary');
    const skillsInput = document.getElementById('skills');
    const educationInput = document.getElementById('education');
    const experienceInput = document.getElementById('experience');

    // Preview elements
    const previewName = document.getElementById('preview-name');
    const previewEmail = document.getElementById('preview-email');
    const previewPhone = document.getElementById('preview-phone');
    const previewSummary = document.getElementById('preview-summary');
    const previewSkills = document.getElementById('preview-skills');
    const previewEducation = document.getElementById('preview-education');
    const previewExperience = document.getElementById('preview-experience');

    // ===== Live Preview Updates =====
    const updatePreview = () => {
      previewName.textContent = nameInput.value || "Your Name";
      previewEmail.textContent = emailInput.value ? "Email: " + emailInput.value : "Email: example@mail.com";
      previewPhone.textContent = phoneInput.value ? "Phone: " + phoneInput.value : "Phone: +880123456789";
      previewSummary.textContent = summaryInput.value || "A short bio about you";
      previewEducation.textContent = educationInput.value || "Degree, University, Year";
      previewExperience.textContent = experienceInput.value || "Job Title, Company, Duration";

      // Skills as pills in preview
      previewSkills.innerHTML = skillsInput.value
        .split(',')
        .filter(skill => skill.trim() !== "")
        .map(skill => `<span>${skill.trim()}</span>`)
        .join('');
    };

    [nameInput, emailInput, phoneInput, summaryInput, skillsInput, educationInput, experienceInput]
      .forEach(input => input.addEventListener('input', updatePreview));

    updatePreview(); // initial preview

    // ===== PDF Download (Professional Two-Column Layout) =====
    downloadBtn.addEventListener("click", () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      const headerColor = [40, 40, 40]; // dark grey
      const accentColor = [60, 130, 200]; // blue

      // HEADER
      doc.setFillColor(...accentColor);
      doc.rect(0, 0, 210, 30, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text(previewName.textContent, 105, 18, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(previewEmail.textContent + " | " + previewPhone.textContent, 105, 26, { align: "center" });

      // MAIN LAYOUT
      doc.setFillColor(245, 245, 245); // left sidebar background
      doc.rect(0, 30, 65, 267, "F"); // left column

      const leftX = 10, rightX = 75;
      let leftY = 45, rightY = 45;

      const addSection = (x, y, title, text, width = 120) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(...accentColor);
        doc.text(title, x, y);
        y += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(...headerColor);
        const splitText = doc.splitTextToSize(text, width);
        doc.text(splitText, x, y);
        y += splitText.length * 6 + 6;
        return y;
      };

      // LEFT COLUMN: Contact & Skills
      leftY = addSection(leftX, leftY, "Contact", previewEmail.textContent + "\n" + previewPhone.textContent, 50);
      leftY = addSection(leftX, leftY, "Skills", skillsInput.value || "HTML, CSS, JavaScript", 50);

      // RIGHT COLUMN: Summary, Education, Experience
      rightY = addSection(rightX, rightY, "Summary", previewSummary.textContent, 120);
      rightY = addSection(rightX, rightY, "Education", previewEducation.textContent, 120);
      rightY = addSection(rightX, rightY, "Experience", previewExperience.textContent, 120);

      // FOOTER
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text("Generated with CV Builder", 105, 290, { align: "center" });

      doc.save("CV.pdf");
    });
  }
});
