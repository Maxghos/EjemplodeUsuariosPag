document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('¡Usuario registrado exitosamente!');
            window.location.href = 'index.html';
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        alert('Ocurrió un error al registrar el usuario.');
    }
});

