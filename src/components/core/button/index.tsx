import './index.css';
import React, { useMemo } from 'react';

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  inverse?: boolean;
  showSpinner?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, inverse, className, children, showSpinner, ...buttonProps },
    ref
  ) => {
    const btnClassName = useMemo(() => {
      switch (variant) {
        case 'primary':
          return 'primary';
        case 'secondary':
          return 'secondary';
        case 'tertiary':
          return 'tertiary';
        default:
          return undefined;
      }
    }, [inverse, variant]);

    return (
      <button
        {...buttonProps}
        // className={classNames(styles.button, btnClassName, className)}
          className={`button ${btnClassName} ${className}`}
        ref={ref}
      >
        {/*{showSpinner && <Spinner className={styles.spinner_btn} size='sm' />}*/}

        {children}
      </button>
    );
  }
);

export default Button;
