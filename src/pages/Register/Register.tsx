import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../../services';
import './Register.css';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};

    if (!name.trim()) {
      errs.name = 'O nome é obrigatório';
    } else if (name.trim().length < 3) {
      errs.name = 'O nome deve ter pelo menos 3 caracteres';
    }

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

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setApiError('');

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    try {
      await userService.register({ name: name.trim(), email: email.trim(), password });
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err:any) {
      if (err instanceof Error) {
        setApiError(err.message.includes('422')
          ? 'Dados inválidos. Verifique os campos e tente novamente.'
          : err.message ? err.message :'Erro ao criar conta. Tente novamente mais tarde.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page register-page">
      <div className="register-card">
        <div className="register-header">
          <span className="register-icon">🌿</span>
          <h1>Criar conta</h1>
          <p className="register-subtitle">Junte-se aos Amigos da Fauna</p>
        </div>

        {success ? (
          <div className="register-success">
            <span className="success-icon">✅</span>
            <p>Conta criada com sucesso!</p>
            <p className="success-redirect">Redirecionando…</p>
          </div>
        ) : (
          <form className="register-form" onSubmit={handleSubmit} noValidate>
            {apiError && (
              <div className="register-api-error" role="alert">
                {apiError}
              </div>
            )}

            <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="register-name">Nome</label>
              <input
                id="register-name"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                autoComplete="name"
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="register-email">E-mail</label>
              <input
                id="register-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                autoComplete="email"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className={`form-field ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="register-password">Senha</label>
              <div className='password-container'>
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                autoComplete="new-password"
              />
              <p onClick={togglePasswordVisibility} className='seeAndHidePassword'>{showPassword ? <IoMdEyeOff/> : <IoMdEye/>}</p>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className="register-submit"
              disabled={submitting}
              id="register-submit-btn"
            >
              {submitting ? 'Criando conta…' : 'Cadastrar'}
            </button>

            <p className="register-login-link">
              Já tem uma conta? <Link to="/login">Entrar</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
