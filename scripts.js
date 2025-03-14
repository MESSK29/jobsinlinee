document.addEventListener('DOMContentLoaded', () => {
    // Sort job roles alphabetically
    const jobRoleSelect = document.getElementById('jobRole');
    const options = Array.from(jobRoleSelect.options);
    const placeholderOption = options.shift(); // Remove placeholder (e.g., "Select a job role")
    options.sort((a, b) => a.text.localeCompare(b.text));
    jobRoleSelect.innerHTML = '';
    jobRoleSelect.appendChild(placeholderOption);
    options.forEach(option => jobRoleSelect.appendChild(option));
  
    // Check for signup redirect and display greeting
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('firstName');
    if (firstName) {
      const heroParagraph = document.querySelector('.hero p');
      heroParagraph.innerHTML = `Hello, <strong>${firstName}</strong>! 🚀 Transform your job search with AI-powered resume analysis and personalized career insights.`;
    }
  
    // Form submission handler for resume analysis
    document.getElementById('resumeForm').addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const resultContent = document.getElementById('resultContent');
      const loading = document.getElementById('loading');
      const submitBtn = document.querySelector('.submit-btn');
  
      // Reset UI state
      resultContent.style.opacity = '0';
      resultContent.innerHTML = '';
      resultContent.classList.remove('error', 'result-success');
      loading.style.display = 'block';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
  
      // Get form inputs
      const resumeFile = document.getElementById('resume').files[0];
      const jobRole = document.getElementById('jobRole').value;
      // Assuming these fields might be added to the form later
      const firstNameInput = document.getElementById('firstName')?.value || firstName || 'N/A';
      const emailInput = document.getElementById('email')?.value || 'N/A';
      const phoneInput = document.getElementById('phone')?.value || 'N/A';
  
      // Validate inputs
      if (!resumeFile || !jobRole) {
        showError('Please upload a resume and select a job role.');
        return;
      }
  
      // Prepare form data
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobRole', jobRole);
      formData.append('firstName', firstNameInput);
      formData.append('email', emailInput);
      formData.append('phone', phoneInput);
  
      try {
        const response = await fetch('https://jobsinline.onrender.com/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server responded with ${response.status}: ${errorText}`);
        }
  
        const data = await response.json();
        loading.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
  
        if (data.error) {
          showError(data.error);
        } else {
          resultContent.classList.add('result-success');
          resultContent.innerHTML = `
            <p><h3>Analysis Results</h3></p>
            <p><strong>Target Role:</strong> ${data.jobRole}</p>
            <p><strong>Hiring Probability:</strong> ${data.probability}%</p>
            <p><strong>Recommendations:</strong></p>
            <p><span><strong>Skills:</strong> ${data.additionalSkills || 'None identified'}</span></p>
            <p><span><strong>Frameworks:</strong> ${data.additionalFrameworks || 'None identified'}</span></p>
            <p><strong>Feedback:</strong> ${data.feedback}</p>
          `;
          resultContent.style.opacity = '1';
          resultContent.style.transition = 'opacity 0.5s ease';
        }
      } catch (error) {
        console.error('Fetch Error:', error.message);
        showError(`An error occurred: ${error.message}`);
      }
  
      function showError(message) {
        loading.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        resultContent.classList.add('error');
        resultContent.innerHTML = `<p>${message}</p>`;
        resultContent.style.opacity = '1';
        resultContent.style.transition = 'opacity 0.5s ease';
      }
    });
  
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  });