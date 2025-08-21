// **IMPORTANTE:** Substitua pelas suas credenciais do Supabase
const SUPABASE_URL = 'https://qauhukqeanfpqarxtiqc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_mTmKQ6YinE3bKNJj3g3d1A_24WIlLVq'; // <-- COLOQUE SUA CHAVE AQUI

const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Lógica de autenticação
async function handleAuth() {
  const { data: { user } } = await supabase.auth.getUser();

  // Se o usuário estiver na página principal e não estiver logado, redirecione-o
  if (!user && window.location.pathname.endsWith('index.html')) {
    window.location.href = 'login.html';
  }

  // Se o usuário estiver na página de login e já estiver logado, redirecione-o para o portal
  if (user && window.location.pathname.endsWith('login.html')) {
    window.location.href = 'index.html';
  }
}

// Lógica de login
async function signInWithEmail() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert('Erro no login: ' + error.message);
  } else {
    // Login bem-sucedido, redireciona para a página principal
    window.location.href = 'index.html';
  }
}

// Lógica de registro
async function signUpNewUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert('Erro no registro: ' + error.message);
  } else {
    alert('Usuário criado com sucesso! Verifique seu e-mail para confirmar a conta.');
  }
}

// Associa as funções aos botões na página de login
document.addEventListener('DOMContentLoaded', () => {
    // Verifique se os elementos do formulário de login existem na página
    if (document.getElementById('login-btn')) {
        document.getElementById('login-btn').addEventListener('click', signInWithEmail);
    }
    if (document.getElementById('signup-btn')) {
        document.getElementById('signup-btn').addEventListener('click', signUpNewUser);
    }

    // Chama a função de verificação de autenticação em todas as páginas
    handleAuth();
});