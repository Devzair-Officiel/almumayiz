"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/app/admin/actions";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAction, {});
  const [showPassword, setShowPassword] = useState(false);
  return <form action={action} className="admin-login-form">
    <label className="admin-login-field"><span>Adresse e-mail</span><div className="admin-login-input"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 6h16v12H4zM4 7l8 6 8-6" /></svg><input name="email" type="email" autoComplete="username" placeholder="vous@exemple.com" required autoFocus /></div></label>
    <label className="admin-login-field"><span>Mot de passe</span><div className="admin-login-input"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Votre mot de passe" required /><button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} aria-pressed={showPassword}>{showPassword ? "Masquer" : "Afficher"}</button></div></label>
    {state.error && <p className="admin-error" role="alert">{state.error}</p>}
    <button className="admin-primary admin-login-submit" disabled={pending}><span>{pending ? "Connexion en cours…" : "Se connecter"}</span><span aria-hidden="true">→</span></button>
  </form>;
}
