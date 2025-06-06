
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
 
function ReclaimDemo() {

  // State to store the verification request URL
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState([]);
 
  const getVerificationReq = async () => {

    // Your credentials from the Reclaim Developer Portal
    // Replace these with your actual credentials

    const APP_ID = '0x619c2601201a15136E7BdD867e6D95375EabDe96';
    const APP_SECRET = '0x43bf87191add9ebfdf6218897ec7c877efa48bf773ecbfd837b779095d3df8a8';
    const PROVIDER_ID = '6d3f6753-7ee6-49ee-a545-62f1b1822ae5';
 
    // Initialize the Reclaim SDK with your credentials
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
 
    // Generate the verification request URL
    const requestUrl = await reclaimProofRequest.getRequestUrl();

    console.log('Request URL:', requestUrl);

    setRequestUrl(requestUrl);
 
    // Start listening for proof submissions
    await reclaimProofRequest.startSession({

      // Called when the user successfully completes the verification
      onSuccess: (proofs) => {

        console.log('Verification success', proofs);
        setProofs(proofs);

        // Add your success logic here, such as:
        // - Updating UI to show verification success
        // - Storing verification status
        // - Redirecting to another page
      },
      // Called if there's an error during verification
      onError: (error) => {

        console.error('Verification failed', error);
 
        // Add your error handling logic here, such as:
        // - Showing error message to user
        // - Resetting verification state
        // - Offering retry options
      },
    });
  };
 
  return (
    <>
      <button onClick={getVerificationReq}>Get Verification Request</button>

      {/* Display QR code when URL is available */}

      {requestUrl && (
        <div style={{ margin: '20px 0' }}>
          <QRCode value={requestUrl} />
        </div>
      )}

      {proofs && (
        <div>
          <h2>Verification Successful!</h2>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
 
export default ReclaimDemo;
