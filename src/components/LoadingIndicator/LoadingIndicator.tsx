import s from './LoadingIndicator.module.scss';
import { LoadingLogo } from './LoadingLogo';

export default function LoadingIndicator() {
  return (
    <div className={s.loading_wrapper}>
      <LoadingLogo />
      <div className={s.animate_pulse}>
        <div className={s.animate_dots}></div>
      </div>
    </div>
  );
}
