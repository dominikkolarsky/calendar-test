import './assets/scss/index.scss';
import Calendar from './components/Calendar/Calendar';
import PerformanceList from './components/PerformanceList/PerformanceList';
import TicketsCounter from './components/TicketsCounter/TicketsCounter';

function App({ domElement }: { domElement: HTMLElement }) {
  const attribute = domElement.getAttribute('data-attribute-1');

  return (
    <>
      <div className="tkd_calendar">
        <div className="tkd_calendar__inner">
          <h2>Hello from micro-frontend-app, called: {attribute}</h2>
          <TicketsCounter />
          <hr className="hr" />
          <Calendar />
          <PerformanceList />
        </div>
      </div>
    </>
  );
}

export default App;
