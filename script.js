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
            time: document.getElementById('time').value.trim(),
 location: document.getElementById('location').value.trim(),
            targetAudience: document.getElementById('targetAudience').value.trim(),
            objectives: document.getElementById('objectives').value.trim(),
            activities: document.getElementById('activities').value.trim(),
            strengths: document.getElementById('strengths').value.trim(),
            weaknesses: document.getElementById('weaknesses').value.trim(),
            preparedBy: document.getElementById('preparedBy').value.trim(),
            position: document.getElementById('position').value.trim(),
            images: imageInput.files
        };

        // Display the output
        outputDiv.innerHTML = `
            <h2>Generated Report</h2>
            <p><strong>Program Name:</strong> ${formData.programName}</p>
            <p><strong>Date:</strong> ${formData.date}</p>
            <p><strong>Time:</strong> ${formData.time}</p>
            <p><strong>Location:</strong> ${formData.location}</p>
            <p><strong>Target Audience:</strong> ${formData.targetAudience}</p>
            <p><strong>Objectives:</strong> ${formData.objectives}</p>
            <p><strong>Activities:</strong> ${formData.activities}</p>
            <p><strong>Strengths:</strong> ${formData.strengths}</p>
            <p><strong>Weaknesses:</strong> ${formData.weaknesses}</p>
            <p><strong>Prepared By:</strong> ${formData.preparedBy}</p>
            <p><strong>Position:</strong> ${formData.position}</p>
        `;

        // Display uploaded images
        const imageContainer = document.createElement('div');
        for (let i = 0; i < formData.images.length; i++) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(formData.images[i]);
            img.style.width = '100px'; // Set a fixed width for images
            img.style.margin = '5px';
            imageContainer.appendChild(img);
        }
        outputDiv.appendChild(imageContainer);

        // Show the download button
        downloadPdfBtn.style.display = 'block';
    });

    // Function to download the report as a PDF
    downloadPdfBtn.addEventListener('click', function () {
        const element = outputDiv;
        html2pdf()
            .from(element)
            .save('one_page_report.pdf'); // Set the name of the downloaded PDF
    });
});
