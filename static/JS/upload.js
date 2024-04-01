document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('uploadForm');
    const statusDiv = document.getElementById('uploadStatus');

    form.getElementById("upload_form").addEventListener('submit', function(e) {
        e.preventDefault();

        // FormData will package the file for us
        const form_data = new FormData(this);
        const fileInput = document.getElementById('fileInput');

        // Update the user that the upload is in progress
        statusDiv.innerHTML = 'Uploading...';

        // Make the request to the server
        fetch('http://127.0.0.1:8080/file_upload', {
            method: 'POST',
            body: form_data,
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log(data);
            // Update the user that the upload was successful
            statusDiv.innerHTML = 'Upload successful!';
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            // Inform the user that an error occurred
            statusDiv.innerHTML = 'Upload failed.';
        });
    });
});
