import axios from 'axios';
import * as cheerio from 'cheerio';

export interface Deal {
  id: string;
  title: string;
  price?: string;
  retailPrice?: string;
  discount?: string;
  store: string;
  url: string;
  imageUrl?: string;
  thumbsUp: number;
  thumbsDown: number;
  comments: number;
  timestamp: string;
}

export class SlickdealsScraperService {
  private baseUrl = 'https://slickdeals.net/forums/forumdisplay.php?f=9';
  
  async fetchDeals(page: number = 1): Promise<Deal[]> {
    try {
      const url = page === 1 ? this.baseUrl : `${this.baseUrl}&page=${page}`;
      
      // Make request with headers to mimic a browser
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        timeout: 10000
      });
      
      const $ = cheerio.load(response.data);
      const deals: Deal[] = [];
      
      // Parse deal threads from the forum listing
      $('.fpGridItem, .threadItem, li.fpGridItem').each((index, element) => {
        const $el = $(element);
        
        // Extract deal information
        const titleEl = $el.find('.itemTitle a, .threadTitle a, a.thread_title_link');
        const title = titleEl.text().trim();
        const dealUrl = titleEl.attr('href');
        
        if (!title || !dealUrl) return;
        
        // Extract ID from URL
        const idMatch = dealUrl.match(/\/f\/(\d+)/);
        const id = idMatch ? idMatch[1] : `deal-${page}-${index}`;
        
        // Extract price information
        const priceText = $el.find('.itemPrice, .price').text().trim();
        
        // Extract store name
        const store = $el.find('.itemStore, .store, .threadMeta').first().text().trim() || 'Various';
        
        // Extract image
        const imageUrl = $el.find('img').first().attr('src') || '';
        
        // Extract voting counts
        const thumbsUpText = $el.find('.vote.voteUp, .thumbsUp').text().trim();
        const thumbsDownText = $el.find('.vote.voteDown, .thumbsDown').text().trim();
        const thumbsUp = parseInt(thumbsUpText) || 0;
        const thumbsDown = parseInt(thumbsDownText) || 0;
        
        // Extract comment count
        const commentsText = $el.find('.commentCount, .replies').text().trim();
        const comments = parseInt(commentsText.replace(/\D/g, '')) || 0;
        
        // Extract timestamp
        const timestamp = $el.find('.time, .threadTime').text().trim() || new Date().toISOString();
        
        const fullUrl = dealUrl.startsWith('http') ? dealUrl : `https://slickdeals.net${dealUrl}`;
        
        deals.push({
          id,
          title,
          price: priceText || undefined,
          store,
          url: fullUrl,
          imageUrl: imageUrl || undefined,
          thumbsUp,
          thumbsDown,
          comments,
          timestamp
        });
      });
      
      return deals;
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw error;
    }
  }
}
