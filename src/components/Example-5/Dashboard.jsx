import React, { useState, Suspense, lazy } from 'react';

// To better simulate a heavy component that takes time to load,
// we can wrap the dynamic import in a promise that resolves after a delay.
const HeavyImageEditor = lazy(() => {
    console.log("Starting to load HeavyImageEditor...");
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("HeavyImageEditor loaded!");
            resolve(import('./HeavyImageEditor'));
        }, 1500); 
    });
});

// If you want to test without the delay, uncomment the line below 
// and comment out the above lazy import. Mainly this is we actually uesed lazy loading.

// const HeavyImageEditor = lazy(() => import('./HeavyImageEditor'));


const Dashboard = () => {
    const [showEditor, setShowEditor] = useState(false);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>This is the main content of the application. It loads quickly because the heavy components are code-split.</p>
            <p>The <strong>Image Editor</strong> below is a "heavy" component. Its code is not downloaded until you click the button to open it.</p>
            
            {!showEditor && (
                <button onClick={() => setShowEditor(true)}>Open Image Editor</button>
            )}
            
            {showEditor && (
                <Suspense fallback={
                    <div style={{marginTop: '20px', padding: '20px', border: '1px dashed #ccc'}}>
                        <h3>Loading Image Editor...</h3>
                        <p>Please wait, the editor component is being downloaded from the server. (Simulated 1.5s delay)</p>
                    </div>
                }>
                    <HeavyImageEditor /> 
                </Suspense>
            )}
        </div>
    );
};

export default Dashboard;