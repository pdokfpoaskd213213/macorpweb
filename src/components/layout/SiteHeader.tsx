import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { primaryNav } from '@/app/navigation';
import { company } from '@/content';
import { useAuth } from '@/features/auth';
import { Logo } from '@/components/ui/Logo';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { status } = useAuth();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const accountLink = status === 'authenticated' ? { to: '/account', label: 'Account' } : { to: '/login', label: 'Artist login' };

  return (
    <>
      <div className={`${styles.utility} surface-ink`}>
        <div className={`container ${styles.utilityInner}`}>
          <span className="t-meta">
            {company.name} — {company.descriptor}
          </span>
          <span className={`t-meta ${styles.utilityRight}`}>
            <span>{company.headquarters}</span>
            <span>Switchboard {company.switchboard}</span>
          </span>
        </div>
      </div>

      <header className={`${styles.header} surface-ink`}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.brand} aria-label="Ma. Corp — home">
            <Logo />
            <span className={styles.brandText}>
              <span>Ma. Corp</span>
              <span className={styles.brandSub}>Est. Hawick</span>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            {primaryNav.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                <span className={styles.bracket}>[</span>
                {item.label}
                <span className={styles.bracket}>]</span>
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link to={accountLink.to} className={styles.login}>
              <span className={styles.loginDot} aria-hidden="true" />
              {accountLink.label}
            </Link>
            <button
              className={styles.menuBtn}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
              <span className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={`${styles.menu} surface-ink ${open ? styles.menuOpen : ''}`} hidden={!open}>
        <nav className="container" aria-label="Mobile">
          <ol className={styles.menuList}>
            {[{ label: 'Home', to: '/' }, ...primaryNav].map((item, i) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.menuActive : ''}`}>
                  <span className="t-meta">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ol>
          <div className={styles.menuFoot}>
            <Link to={accountLink.to} className={styles.menuLogin}>
              {accountLink.label} →
            </Link>
            <span className="t-meta t-muted">
              {company.email} · {company.switchboard}
            </span>
          </div>
        </nav>
      </div>
    </>
  );
}
