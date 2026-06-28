import Image from "next/image";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");
  return <main className="admin-login-page">
    <section className="admin-login-showcase" aria-hidden="true">
      <div className="admin-login-pattern" />
      <div className="admin-login-showcase-content">
        <span className="admin-login-tag">Espace éditorial</span>
        <h1>Donnez vie à<br />vos histoires.</h1>
        <p>Créez, enrichissez et publiez vos contenus depuis un espace conçu pour rester simple.</p>
        <div className="admin-login-features"><span>Articles multilingues</span><span>SEO intégré</span><span>Publication maîtrisée</span></div>
      </div>
    </section>
    <section className="admin-login-panel">
      <div className="admin-login-card">
        <Image src="/images/brand/wordmark.png" width={661} height={134} alt="AL MUMAYIZ" loading="eager" />
        <div className="admin-login-heading"><p>Administration du blog</p><h2>Heureux de vous revoir</h2><span>Connectez-vous pour accéder à votre espace.</span></div>
        <AdminLoginForm />
        <p className="admin-login-security"><span aria-hidden="true">◇</span> Accès privé et sécurisé</p>
      </div>
    </section>
  </main>;
}
