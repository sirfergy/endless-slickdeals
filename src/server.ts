import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { SlickdealsScraperService } from './scraper';
import { MockDataService } from './mockData';

const app = express();
const PORT = process.env.PORT || 3000;
const USE_MOCK = process.env.USE_MOCK === 'true';

// Enable CORS
app.use(cors());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

const scraperService = new SlickdealsScraperService();
const mockService = new MockDataService();

// API endpoint to get deals with pagination
app.get('/api/deals', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    
    if (page < 1) {
      return res.status(400).json({ error: 'Page must be greater than 0' });
    }
    
    let deals;
    
    // Try real scraper first, fall back to mock data
    if (USE_MOCK) {
      deals = await mockService.fetchDeals(page);
    } else {
      try {
        deals = await scraperService.fetchDeals(page);
      } catch (scraperError) {
        console.log(`Real scraper failed for page ${page}, using mock data:`, scraperError instanceof Error ? scraperError.message : scraperError);
        deals = await mockService.fetchDeals(page);
      }
    }
    
    res.json({
      page,
      deals,
      hasMore: deals.length > 0 // Simple check - if we got deals, there might be more
    });
  } catch (error) {
    console.error('Error in /api/deals:', error);
    res.status(500).json({ 
      error: 'Failed to fetch deals',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/deals`);
  console.log(`Using ${USE_MOCK ? 'MOCK' : 'REAL'} data source`);
});

