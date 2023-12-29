import s from './CtaButton.module.scss';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type CtaButtonProps = {
  children: ReactNode;
  color: 'primary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CtaButton = (props: CtaButtonProps) => {
  const { children, color, ...rest } = props;
  const colorClass = color === 'primary' ? s.btn__green : '';

  return (
    <button  {...rest} type='button' className={`${s.btn} ${colorClass}`}>
      {children}
    </button>
  );
};

export default CtaButton;
