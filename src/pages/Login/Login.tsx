import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../../services';
import './Login.css';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

interface FormErrors {
  email?: string;
  password?: string;
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};

    if (!email.trim()) {
      errs.email = 'O e-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Informe um e-mail válido';
    }

    if (!password) {
      errs.password = 'A senha é obrigatória';
    } else if (password.length < 6) {
      errs.password = 'A senha deve ter pelo menos 6 caracteres';
    }

    return errs;
  }
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError('');

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    try {
      await userService.login({ email: email.trim(), password });
      navigate('/');
    } catch (err: any) {
      if (err instanceof Error) {
        setApiError(
          err.message.includes('422')
            ? 'Dados inválidos. Verifique os campos e tente novamente.'
            : err.message
              ? err.message
              : 'Erro ao entrar. Tente novamente mais tarde.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">🌿</span>
          <h1>Entrar</h1>
          <p className="login-subtitle">Bem-vindo de volta!</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {apiError && (
            <div className="login-api-error" role="alert">
              {apiError}
            </div>
          )}

          <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              autoComplete="email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className={`form-field ${errors.password ? 'has-error' : ''}`}>
            <label htmlFor="login-password">Senha</label>
            <div className='password-container'>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              autoComplete="current-password"
            />
            <p onClick={togglePasswordVisibility} className='seeAndHidePassword'>{showPassword ? <IoMdEyeOff/> : <IoMdEye/>}</p>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={submitting}
            id="login-submit-btn"
          >
            {submitting ? 'Entrando…' : 'Entrar'}
          </button>

          <p className="login-register-link">
            Não tem uma conta? <Link to="/register">Cadastrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
