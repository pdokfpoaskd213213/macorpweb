import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type Variant = 'solid' | 'outline' | 'link';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}

type ButtonProps = BaseProps &
  (
    | { to: string; href?: never; onClick?: never; type?: never; disabled?: never }
    | { href: string; to?: never; onClick?: never; type?: never; disabled?: never }
    | { onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; to?: never; href?: never }
  );

/** One button, three renderings: router link, external link, or <button>. */
export function Button({ children, variant = 'solid', arrow = false, className = '', ...rest }: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if ('to' in rest && rest.to) {
    return (
      <Link to={rest.to} className={cls}>
        {inner}
      </Link>
    );
  }
  if ('href' in rest && rest.href) {
    const external = /^https?:/.test(rest.href);
    return (
      <a href={rest.href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  const { onClick, type = 'button', disabled } = rest as { onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
