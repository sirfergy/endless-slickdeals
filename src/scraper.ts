import axios from 'axios';
import * as cheerio from 'cheerio';

export interface Deal {
  id: string;
  title: string;
  price?: string;
  listPrice?: string;
  store: string;
  url: string;
  imageUrl?: string;
  thumbsUp: number;
  comments: number;
  views: number;
  timestamp: string;
  category?: string;
}

export class SlickdealsScraperService {
  private baseUrl = 'https://slickdeals.net/forums/forumdisplay.php?f=9';

  async fetchDeals(page: number = 1): Promise<Deal[]> {
    const url = `${this.baseUrl}&page=${page}`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);
    const deals: Deal[] = [];

    $('tr[id^="sdpostrow_"]').each((_index, element) => {
      const $el = $(element);

      // Find the title link with deal data
      const titleLink = $el.find('a[id^="thread_title_"]');
      const title = titleLink.text().trim();
      if (!title) return;

      // Skip sticky threads
      const threadLine = $el.find('.threadtitleline').text();
      if (threadLine.includes('Sticky:')) return;

      const threadId = titleLink.attr('data-thread-id') || '';
      const dealPath = titleLink.attr('href') || '';
      const dealUrl = dealPath.startsWith('http') ? dealPath : `https://slickdeals.net${dealPath}`;

      // Price from data attributes
      const finalPrice = titleLink.attr('data-final-price') || undefined;
      const listPrice = titleLink.attr('data-list-price') || undefined;

      // Image from data-thread-image on the row
      const threadImage = $el.attr('data-thread-image');
      let imageUrl: string | undefined;
      if (threadImage && !threadImage.includes('deal-tag.png')) {
        imageUrl = threadImage.startsWith('http')
          ? threadImage
          : `https://static.slickdealscdn.com${threadImage}`;
      }

      // Category
      const category = $el.find('.threadCategoryForm button').text().trim() || undefined;

      // Vote score from rating image alt text (e.g., "Votes: 83 Score: 73")
      const ratingAlt = $el.find('img[class*="rating"]').attr('alt') || '';
      const scoreMatch = ratingAlt.match(/Score:\s*(\d+)/);
      const thumbsUp = scoreMatch ? parseInt(scoreMatch[1]) : 0;

      // Replies and views from the table cells
      const cells = $el.find('td[align="center"]');
      const replies = parseInt($(cells[0]).text().trim().replace(/,/g, '')) || 0;
      const views = parseInt($(cells[1]).text().trim().replace(/,/g, '')) || 0;

      // Timestamp from post date cell
      const postDateCell = $el.find('td[id^="td_postdate_"] .smallfont');
      const dateText = postDateCell.contents().first().text().trim();
      const timeText = postDateCell.find('.time').text().trim();
      const timestamp = timeText ? `${dateText} ${timeText}` : dateText;

      deals.push({
        id: threadId,
        title,
        price: finalPrice,
        listPrice,
        store: 'Various',
        url: dealUrl,
        imageUrl,
        thumbsUp,
        comments: replies,
        views,
        timestamp,
        category,
      });
    });

    return deals;
  }
}
