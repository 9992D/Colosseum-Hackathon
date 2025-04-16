import { useState } from 'react';
import QRCode from 'react-qr-code';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';

function ReclaimDemo() {
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState([]);

  const getVerificationReq = async () => {
    const APP_ID = '0x619c2601201a15136E7BdD867e6D95375EabDe96';
    const APP_SECRET = '0x43bf87191add9ebfdf6218897ec7c877efa48bf773ecbfd837b779095d3df8a8';
    const PROVIDER_ID = '5dbf61bc-1b14-454c-9c16-bbe4dcf262f6';

    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);

    const requestUrl = await reclaimProofRequest.getRequestUrl();

    console.log('Request URL:', requestUrl);
    setRequestUrl(requestUrl);

    await reclaimProofRequest.startSession({
      onSuccess: (proofs) => {
        console.log('Verification success', proofs);
        setProofs(proofs);
      },
      onError: (error) => {
        console.error('Verification failed', error);
      },
    });
  };

  return (
    <>
      <button onClick={getVerificationReq}>Get Verification Request</button>
      {requestUrl && (
        <div style={{ margin: '20px 0' }}>
          <QRCode value={requestUrl} />
        </div>
      )}
      {proofs && proofs.length > 0 && (
        <div>
          <h2>Verification Successful!</h2>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export default ReclaimDemo;
