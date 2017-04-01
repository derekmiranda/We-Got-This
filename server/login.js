const login = $('#login');

login.on('click', (e) => {
  e.preventDefault();
  let username = $("#username").val();
  let password = $('#password').val();
  if (username && password) {
    $.post('/login', { username: username });
  } 
});