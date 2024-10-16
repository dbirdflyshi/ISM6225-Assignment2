function templates(url, placeholderId) {
    fetch(url)
      .then(response => response.text())
      .then(data => document.getElementById(placeholderId).innerHTML = data)
      .catch(error => console.error('Error loading component:', error));
  }
  
  // Load the header and footer components
  templates('navbar.html', 'navbar-placeholder');
  templates('footer.html', 'footer-placeholder');