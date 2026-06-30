import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">
          <span className="admin-brand-mark">AM</span>
          <span>
            <strong>AL MUMAYIZ</strong>
            <small>Studio éditorial</small>
          </span>
        </Link>
        <nav>
          <p>Gestion</p>
          <Link href="/admin"><span aria-hidden="true">▦</span> Articles</Link>
          <Link href="/admin/articles/new"><span aria-hidden="true">＋</span> Nouvel article</Link>
          <p>Site</p>
          <a href="/fr/blog" target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">↗</span> Voir le blog
          </a>
          <a href="/fr" target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">⌂</span> Voir le site
          </a>
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-avatar">A</div>
          <div>
            <strong>Administrateur</strong>
            <small>Gestionnaire du blog</small>
          </div>
          <form action={logoutAction}>
            <button title="Déconnexion" aria-label="Déconnexion">↪</button>
          </form>
        </div>
      </aside>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <span className="admin-mobile-mark">AM</span>
            <p>Espace d'administration</p>
          </div>
          <Link href="/admin/articles/new" className="admin-topbar-create">＋ Créer</Link>
        </header>
        <main className="admin-shell">{children}</main>
      </div>
    </div>
  );
}
