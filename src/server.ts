import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { SlickdealsScraperService } from './scraper';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

const scraperService = new SlickdealsScraperService();

// API endpoint to get deals with pagination
app.get('/api/deals', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    
    if (page < 1) {
      return res.status(400).json({ error: 'Page must be greater than 0' });
    }
    
    const deals = await scraperService.fetchDeals(page);
    
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
});
