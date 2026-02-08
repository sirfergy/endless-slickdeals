import { Deal } from './scraper';

export class MockDataService {
  private mockDeals: Deal[] = [
    {
      id: '1',
      title: 'Apple AirPods Pro (2nd Gen) - Amazing Deal!',
      price: '$199.99',
      retailPrice: '$249.99',
      store: 'Amazon',
      url: 'https://slickdeals.net/f/1',
      imageUrl: 'https://via.placeholder.com/300x200?text=AirPods+Pro',
      thumbsUp: 450,
      thumbsDown: 12,
      comments: 89,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      title: 'Samsung 65" 4K Smart TV - Lowest Price Ever',
      price: '$499.99',
      retailPrice: '$799.99',
      store: 'Best Buy',
      url: 'https://slickdeals.net/f/2',
      imageUrl: 'https://via.placeholder.com/300x200?text=Samsung+TV',
      thumbsUp: 823,
      thumbsDown: 23,
      comments: 156,
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      title: 'Nintendo Switch OLED Console Bundle',
      price: '$349.99',
      store: 'GameStop',
      url: 'https://slickdeals.net/f/3',
      imageUrl: 'https://via.placeholder.com/300x200?text=Nintendo+Switch',
      thumbsUp: 612,
      thumbsDown: 18,
      comments: 234,
      timestamp: '6 hours ago'
    },
    {
      id: '4',
      title: 'Sony WH-1000XM5 Noise Cancelling Headphones',
      price: '$349.99',
      retailPrice: '$399.99',
      store: 'Target',
      url: 'https://slickdeals.net/f/4',
      imageUrl: 'https://via.placeholder.com/300x200?text=Sony+Headphones',
      thumbsUp: 389,
      thumbsDown: 9,
      comments: 67,
      timestamp: '8 hours ago'
    },
    {
      id: '5',
      title: 'Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker',
      price: '$79.99',
      retailPrice: '$149.99',
      store: 'Walmart',
      url: 'https://slickdeals.net/f/5',
      imageUrl: 'https://via.placeholder.com/300x200?text=Instant+Pot',
      thumbsUp: 567,
      thumbsDown: 14,
      comments: 145,
      timestamp: '10 hours ago'
    },
    {
      id: '6',
      title: 'Apple iPad Air (5th Gen) with M1 Chip',
      price: '$549.99',
      retailPrice: '$599.99',
      store: 'Apple',
      url: 'https://slickdeals.net/f/6',
      imageUrl: 'https://via.placeholder.com/300x200?text=iPad+Air',
      thumbsUp: 712,
      thumbsDown: 21,
      comments: 198,
      timestamp: '12 hours ago'
    },
    {
      id: '7',
      title: 'Dyson V15 Detect Cordless Vacuum',
      price: '$549.99',
      retailPrice: '$749.99',
      store: 'Dyson',
      url: 'https://slickdeals.net/f/7',
      imageUrl: 'https://via.placeholder.com/300x200?text=Dyson+Vacuum',
      thumbsUp: 423,
      thumbsDown: 16,
      comments: 87,
      timestamp: '14 hours ago'
    },
    {
      id: '8',
      title: 'Bose QuietComfort 45 Headphones',
      price: '$279.99',
      retailPrice: '$329.99',
      store: 'Bose',
      url: 'https://slickdeals.net/f/8',
      imageUrl: 'https://via.placeholder.com/300x200?text=Bose+QC45',
      thumbsUp: 501,
      thumbsDown: 11,
      comments: 123,
      timestamp: '16 hours ago'
    },
    {
      id: '9',
      title: 'LG 27" UltraGear Gaming Monitor 144Hz',
      price: '$229.99',
      retailPrice: '$349.99',
      store: 'Amazon',
      url: 'https://slickdeals.net/f/9',
      imageUrl: 'https://via.placeholder.com/300x200?text=LG+Monitor',
      thumbsUp: 634,
      thumbsDown: 19,
      comments: 167,
      timestamp: '18 hours ago'
    },
    {
      id: '10',
      title: 'Roku Streaming Stick 4K',
      price: '$34.99',
      retailPrice: '$49.99',
      store: 'Roku',
      url: 'https://slickdeals.net/f/10',
      imageUrl: 'https://via.placeholder.com/300x200?text=Roku+Stick',
      thumbsUp: 289,
      thumbsDown: 7,
      comments: 54,
      timestamp: '20 hours ago'
    }
  ];

  async fetchDeals(page: number = 1): Promise<Deal[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const perPage = 10;
    const start = (page - 1) * perPage;
    
    // Generate more deals by repeating and modifying IDs
    if (start >= this.mockDeals.length) {
      return this.mockDeals.map((deal, idx) => ({
        ...deal,
        id: `${page}-${idx}`,
        title: `[Page ${page}] ${deal.title}`,
      })).slice(0, perPage);
    }
    
    return this.mockDeals.slice(start, start + perPage);
  }
}
