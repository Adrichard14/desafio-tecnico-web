import useFetchGenres from "./hooks/useFetchGenres";
import { Genre } from "./types/Genre";
import './login.css';
import './index.css';
import { useState } from "react";

import { useAuth } from "./components/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();

  const { genres } = useFetchGenres();
  const genreMap = new Map();
  if (genres && genres.length > 0) {
    genres.map((genre: Genre) => {
      genreMap.set(genre.id, genre.name);
    });
  }

  const onLoginFormSubmited = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err) {
      toast.error('Ocorreu um erro ao realizar login!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return <>
    <div className="container-fluid container-home h-100">
      <div className="container">
        <section className="p-3 p-md-4 p-xl-5 d-flex align-items-center" id="login-section">
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-lg-5">
                <div className="card" id="login-card">
                  <div className="row g-0">
                    <div className="col-12">
                      <div className="card-body p-1 p-md-2 p-xl-2">
                        <form onSubmit={onLoginFormSubmited} id="login-form">
                          <div className="row gy-2 gy-md-3 overflow-hidden">
                            <div className="col-12">
                              <label className="form-label">Nome/E-mail</label>
                              <input type="email" className="form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nome/E-mail" required />
                            </div>
                            <div className="col-12">
                              <label className="form-label">Senha</label>
                              <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Digite sua senha" />
                            </div>
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center">
                                <a href="#" id="forgot-pwd">Esqueci minha senha</a>
                                <button className="default-theme-btn btn" type="submit">Entrar</button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </>
}
