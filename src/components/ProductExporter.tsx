import { useState } from 'react';
import { 
  downloadProductsAsJSON, 
  downloadProductsAsSQL, 
  copyProductsToClipboard,
  logProducts,
  exportProductsAsJSON 
} from '../utils/downloadProducts';
import { syncAllProducts, syncAllProductsBatch } from '../utils/api';

export default function ProductExporter() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResults, setSyncResults] = useState<any[]>([]);

  const handleSyncProducts = async () => {
    setIsSyncing(true);
    setSyncResults([]);
    try {
      const results = await syncAllProducts();
      setSyncResults(results);
      const successCount = results.filter(r => r.success).length;
      alert(`Synced ${successCount}/${results.length} products successfully!`);
    } catch (error) {
      console.error('Sync failed:', error);
      alert('Failed to sync products. Check console for details.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncBatch = async () => {
    setIsSyncing(true);
    try {
      const result = await syncAllProductsBatch();
      alert('Products synced successfully!');
      console.log('Batch sync result:', result);
    } catch (error) {
      console.error('Batch sync failed:', error);
      alert('Failed to sync products. Check console for details.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'var(--dark-light)', 
      borderRadius: '12px',
      margin: '2rem',
      border: '1px solid rgba(99, 102, 241, 0.2)'
    }}>
      <h3 style={{ 
        marginBottom: '1.5rem',
        background: 'var(--gradient-1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Export Products to Backend
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          className="add-to-cart-btn"
          onClick={downloadProductsAsJSON}
          style={{ width: '100%' }}
        >
          📥 Download JSON
        </button>
        
        <button
          className="add-to-cart-btn"
          onClick={downloadProductsAsSQL}
          style={{ width: '100%' }}
        >
          📥 Download SQL
        </button>
        
        <button
          className="add-to-cart-btn"
          onClick={copyProductsToClipboard}
          style={{ width: '100%' }}
        >
          📋 Copy JSON
        </button>
        
        <button
          className="add-to-cart-btn"
          onClick={logProducts}
          style={{ width: '100%' }}
        >
          📊 Log to Console
        </button>
      </div>

      <div style={{ 
        borderTop: '1px solid rgba(99, 102, 241, 0.2)',
        paddingTop: '1rem',
        marginTop: '1rem'
      }}>
        <h4 style={{ marginBottom: '0.5rem', color: 'var(--gray-light)' }}>
          Sync to Backend API
        </h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="add-to-cart-btn"
            onClick={handleSyncProducts}
            disabled={isSyncing}
            style={{ 
              background: isSyncing ? 'var(--gray)' : 'var(--gradient-1)',
              opacity: isSyncing ? 0.6 : 1,
              cursor: isSyncing ? 'not-allowed' : 'pointer'
            }}
          >
            {isSyncing ? '⏳ Syncing...' : '🚀 Sync All Products'}
          </button>
          
          <button
            className="add-to-cart-btn"
            onClick={handleSyncBatch}
            disabled={isSyncing}
            style={{ 
              background: isSyncing ? 'var(--gray)' : 'var(--gradient-1)',
              opacity: isSyncing ? 0.6 : 1,
              cursor: isSyncing ? 'not-allowed' : 'pointer'
            }}
          >
            {isSyncing ? '⏳ Syncing...' : '🚀 Sync Batch'}
          </button>
        </div>
        
        {syncResults.length > 0 && (
          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            background: 'var(--dark)',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}>
            <strong>Sync Results:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              {syncResults.map((result, idx) => (
                <li key={idx} style={{ 
                  color: result.success ? 'var(--primary-light)' : 'var(--secondary)'
                }}>
                  {result.success ? '✓' : '✗'} {result.product}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ 
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '8px',
        fontSize: '0.85rem',
        color: 'var(--gray-light)'
      }}>
        <strong>💡 Tips:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Set <code>VITE_API_BASE_URL</code> in <code>.env</code> for API sync</li>
          <li>JSON format matches your database schema</li>
          <li>Images are stored as URLs (you can upload them separately)</li>
        </ul>
      </div>
    </div>
  );
}


