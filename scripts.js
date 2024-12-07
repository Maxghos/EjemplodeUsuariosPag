document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita la recarga de la página

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!email || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso'); // Mensaje de éxito
            localStorage.setItem('token', data.token); // Guarda el token en localStorage
            window.location.href = 'dashboard.html'; // Redirige a una página protegida
        } else {
            // Si hay error (usuario no encontrado o contraseña incorrecta)
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Ocurrió un error al iniciar sesión. Intenta nuevamente más tarde.');
    }
});
