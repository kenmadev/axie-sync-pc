import './App.css';
import { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

const App = () => {
  const [synced, syncReady] = useState(false);
  const [error, setError] = useState('');

  const onSync = () => {
    window.electron &&
      window.electron.axieSync
        .watch()
        .then(() => syncReady(true))
        .catch(err => setError(err.message));
  };

  const onUnSync = () => {
    window.electron &&
      window.electron.axieSync
        .unwatch()
        .then(() => syncReady(false))
        .catch(err => setError(err.message));
  };

  const renderBody = () => {
    if (!isEmpty(error)) {
      return (
        <>
          <Division>
            <CenterText>
              There was an error when trying to monitor the battle logs. Please
              restart the app and try again. If problem persist, please contact
              the manager.
            </CenterText>
            <Divider />
            <ErrorText>Error details: {error}</ErrorText>
          </Division>
        </>
      );
    }

    if (!synced) {
      return (
        <>
          <Division>
            <CenterText>
              This application will sync the axie battle history to the cloud
              and help the managers view the battle replays easily. Tap the Sync
              button to start.
            </CenterText>
          </Division>
          <ActionView>
            <ActionButton onClick={onSync}>Sync</ActionButton>
          </ActionView>
        </>
      );
    }

    return (
      <>
        <Division>
          <CenterText>
            Axie battle history is now being monitored! Please minimize this app
            and get into battle.
          </CenterText>
        </Division>
        <ActionView>
          <ActionButton unsync={true} onClick={onUnSync}>
            UnSync
          </ActionButton>
        </ActionView>
      </>
    );
  };

  return (
    <div className='App'>
      <div className='App-header'>{renderBody()}</div>
    </div>
  );
};

const Division = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const CenterText = styled.span`
  text-align: center;
  color: #fff;
  font-size: 14px;
`;

const ActionView = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

const ActionButton = styled.button`
  background-color: ${props => (props.unsync ? '#ef5350' : '#1976d2')};
  height: 35px;
  width: 120px;
  border: 1px solid ${props => (props.unsync ? '#ef5350' : '#1976d2')};
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
`;

const Divider = styled.div`
  margin-bottom: 20px;
`;

const ErrorText = styled.span`
  background-color: #afafaf;
  padding: 10px 15px;
`;

export default App;
