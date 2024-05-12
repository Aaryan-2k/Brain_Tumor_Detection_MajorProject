window.onload = function() {
    // Fetch profile data from backend (assuming you have an endpoint to fetch user data)
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => {
        // Populate form fields with fetched data
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
      })
      .catch(error => console.error('Error fetching profile:', error));
  
    // Handle form submission
    document.getElementById('profile-form').addEventListener('submit', function(event) {
      event.preventDefault();
      
      const formData = new FormData(this);
  
      // Send form data to backend for updating profile
      fetch('/api/profile/update', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          alert('Profile updated successfully!');
        } else {
          throw new Error('Failed to update profile');
        }
      })
      .catch(error => console.error('Error updating profile:', error));
    });
  };