
const HeavyImageEditor = () => {
  // This component is designed to simulate a "heavy" component.
  // In a real application, it might contain many lines of code,
  // large dependencies, or complex rendering logic.
  return (
    <div style={{ border: '2px solid #007bff', borderRadius: '5px', padding: '20px', marginTop: '20px', backgroundColor: '#f8f9fa' }}>
      <h2>🖼️ Heavy Image Editor</h2>
      <p>This component was <strong>lazy-loaded</strong>. If you check your browser's network tab, you'll see its JavaScript chunk was downloaded only when you clicked the "Open" button.</p>
      <div style={{ 
        width: '100%', 
        height: '300px', 
        backgroundColor: '#e9ecef', 
        border: '1px solid #ced4da', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: '5px',
        color: '#6c757d'
      }}>
        <p>[Image Canvas Placeholder]</p>
      </div>
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button>Zoom In</button>
        <button>Zoom Out</button>
        <button>Crop</button>
        <button>Rotate</button>
        <button>Apply Grayscale Filter</button>
        <button>Save Image</button>
      </div>
    </div>
  );
};

export default HeavyImageEditor;