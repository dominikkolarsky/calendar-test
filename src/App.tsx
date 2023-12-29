import './assets/scss/index.scss';
import s from './App.module.scss';

import Calendar from './components/Calendar/Calendar';
import PerformanceList from './components/PerformanceList/PerformanceList';
import TicketsCounter from './components/TicketsCounter/TicketsCounter';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import CtaButton from './components/CtaButton/CtaButton';
import useLoadAndUpdateContext from './utils/hooks/useLoadAndUpdateContext';

function App({ domElement }: { domElement: HTMLElement }) {
  const id = domElement.getAttribute('data-product-id')!;
  const { isLoading, error, fetchData } = useLoadAndUpdateContext(id, 'TTG', 2);

  return (
    <>
      <div className={s.calendar}>
        <div className={s.calendar__container}>
          {!isLoading && error === null && (
            <div className={s.calendar__inner}>
              <TicketsCounter />
              <hr />
              <Calendar />
              <PerformanceList />
            </div>
          )}

          {isLoading && error === null && (
            <div className={s.loading__wrapper}>
              <LoadingIndicator />
            </div>
          )}

          {error && (
            <div className={s.error__wrapper}>
              <div>
                <h5>{'Sorry, there was an issue loading the calendar.'}</h5>
                <span style={{ fontSize: '.75rem', color: 'var(--clr-disabled)', wordWrap: 'break-word' }}>
                  Error: {error}
                </span>
              </div>
              <CtaButton
                style={{ paddingBlock: '.5rem', paddingInline: '1rem' }}
                color="primary"
                onClick={() => void fetchData()}
              >
                Try Again
              </CtaButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
