document.addEventListener("DOMContentLoaded", function () {
    const reportForm = document.getElementById("reportForm");
    const outputDiv = document.getElementById("output");
    const downloadPdfBtn = document.getElementById("downloadPdfBtn");
    const imageInput = document.getElementById("images");

    // Function to reformat date from yyyy-mm-dd to dd/mm/yyyy
    function formatDate(inputDate) {
        if (!inputDate) return ''; // Handle empty input
        const dateParts = inputDate.split('-'); // Split the date into parts
        if (dateParts.length === 3) {
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];
            return `${day}/${month}/${year}`; // Reformat to dd/mm/yyyy
        }
        return inputDate; // Return the original date if formatting fails
    }

    // Script to handle form submission and generate output dynamically
    reportForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Collect form data
        const formData = {
            programName: document.getElementById('programName').value.trim(),
            date: formatDate(document.getElementById('date').value), // Format the date
            time: document.getElementById('time').value .trim(),
            location: document.getElementById('location').value.trim(),
            targetAudience: document.getElementById('targetAudience').value.trim(),
            objectives: document.getElementById('objectives').value.trim(),
            activities: document.getElementById('activities').value.trim(),
            strengths: document.getElementById('strengths').value.trim(),
            weaknesses: document.getElementById('weaknesses').value.trim(),
            preparedBy: document.getElementById('preparedBy').value.trim(),
            position: document.getElementById('position').value.trim()
        };

        // Handle image uploads
        const imageFiles = Array.from(document.getElementById('images').files);
        const imagePreviews = imageFiles.slice(0, 4).map(file => {
            const reader = new FileReader();
            return new Promise((resolve) => {
                reader.onload = function (e) {
                    resolve(`<img src="${e.target.result}" alt="${file.name}">`);
                };
                reader.readAsDataURL(file); // Read the file as a data URL
            });
        });

        // Wait for all images to load
        Promise.all(imagePreviews).then(images => {
            // Generate output HTML
            const outputHTML = `
                <div class="report-container">
                    <h2>Generated Report</h2>
                    <p><strong>Nama Program/Aktiviti:</strong> ${formData.programName}</p>
                    <p><strong>Tarikh:</strong> ${formData.date}</p>
                    <p><strong>Masa:</strong> ${formData.time}</p>
                    <p><strong>Tempat:</strong> ${formData.location}</p>
                    <p><strong>Sasaran:</strong> ${formData.targetAudience}</p>
                    <p><strong>Objektif:</strong> ${formData.objectives}</p>
                    <p><strong>Aktiviti:</strong> ${formData.activities}</p>
                    <p><strong>Kekuatan:</strong> ${formData.strengths}</p>
                    <p><strong>Kelemahan:</strong> ${formData.weaknesses}</p>
                    <p><strong>Gambar:</strong></p>
                    <div class="image-grid">${images.join('')}</div>
                    <p><strong>Disediakan oleh:</strong> ${formData.preparedBy}</p>
                    <p><strong>Jawatan:</strong> ${formData.position}</p>
                </div>
            `;

            // Display the output
            outputDiv.innerHTML = outputHTML;

            // Show the download button
            downloadPdfBtn.style.display = 'block';
        });
    });

    // Function to download the report as a PDF
    downloadPdfBtn.addEventListener('click', function () {
        const element = outputDiv;
        html2pdf()
            .from(element)
            .set({
                margin: 1,
                filename: 'one_page_report.pdf',
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            })
            .save(); // Set the name of the downloaded PDF
    });
});
