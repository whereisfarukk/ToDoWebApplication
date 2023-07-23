document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
 
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = loginForm.elements.email.value;
    const password = loginForm.elements.password.value;

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
     
      if (response.ok) {
        const data = await response.json();

        const token = data.token;
        const userId = data.userId;
        const username = data.username;
        // saving the retrived token and  userId in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
       localStorage.setItem('username', username);
        const usernameElement = document.getElementById('username');
        if (usernameElement) {
          usernameElement.textContent = username;
        }
        console.log(userId);
        window.location.href = '/todo';
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        console.log(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  });
});
