import './login.css';
import './index.css';
import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import { createUser } from "./api/userApi";
import axios from 'axios';

export default function RegisterPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const onRegisterFormSubmited = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser({ name, email, password, confirmPassword });
            toast.success('Usuário criado com sucesso!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            window.location.assign('login');
        } catch (err) {
            let errMessage = 'Ocorreu um erro ao tentar se cadastrar!';
            if (axios.isAxiosError(err)) {
                if (err?.response?.data?.error.message) {
                    errMessage = err.response.data.error.message;
                }
            } else {
                console.error(err);
            }
            toast.error(errMessage, {
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
                                                <form onSubmit={onRegisterFormSubmited} id="login-form">
                                                    <div className="row gy-2 gy-md-3 overflow-hidden">
                                                        <div className="col-12">
                                                            <label className="form-label">Nome</label>
                                                            <input type="text" className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite o seu nome" required />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label">E-mail</label>
                                                            <input type="email" className="form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o seu e-mail" required />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label">Senha</label>
                                                            <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Digite sua senha" />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label">Confirmação de senha</label>
                                                            <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Digite sua senha" />
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="d-flex justify-content-end align-items-center">
                                                                <button className="default-theme-btn btn" type="submit">Cadastrar</button>
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
