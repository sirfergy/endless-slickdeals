import { Deal } from './scraper';

export class MockDataService {
  private mockDeals: Deal[] = [
    {
      id: '1',
      title: 'Apple AirPods Pro (2nd Gen) - Amazing Deal!',
      price: '$199.99',
      listPrice: '$249.99',
      store: 'Amazon',
      url: 'https://slickdeals.net/f/1',
      imageUrl: 'https://via.placeholder.com/300x200?text=AirPods+Pro',
      thumbsUp: 450,
      comments: 89,
      views: 3200,
      timestamp: '2 hours ago',
      createdAt: '02-05-2026 10:30 AM',
      lastCommentedAt: '02-07-2026 08:15 AM'
    },
    {
      id: '2',
      title: 'Samsung 65" 4K Smart TV - Lowest Price Ever',
      price: '$499.99',
      listPrice: '$799.99',
      store: 'Best Buy',
      url: 'https://slickdeals.net/f/2',
      imageUrl: 'https://via.placeholder.com/300x200?text=Samsung+TV',
      thumbsUp: 823,
      comments: 156,
      views: 8500,
      timestamp: '4 hours ago',
      createdAt: '02-03-2026 02:15 PM',
      lastCommentedAt: '02-07-2026 06:45 AM'
    },
    {
      id: '3',
      title: 'Nintendo Switch OLED Console Bundle',
      price: '$349.99',
      store: 'GameStop',
      url: 'https://slickdeals.net/f/3',
      imageUrl: 'https://via.placeholder.com/300x200?text=Nintendo+Switch',
      thumbsUp: 612,
      comments: 234,
      views: 5400,
      timestamp: '6 hours ago',
      createdAt: '02-01-2026 09:00 AM',
      lastCommentedAt: '02-07-2026 04:30 AM'
    },
    {
      id: '4',
      title: 'Sony WH-1000XM5 Noise Cancelling Headphones',
      price: '$349.99',
      listPrice: '$399.99',
      store: 'Target',
      url: 'https://slickdeals.net/f/4',
      imageUrl: 'https://via.placeholder.com/300x200?text=Sony+Headphones',
      thumbsUp: 389,
      comments: 67,
      views: 2100,
      timestamp: '8 hours ago',
      createdAt: '02-06-2026 11:00 AM',
      lastCommentedAt: '02-07-2026 02:10 AM'
    },
    {
      id: '5',
      title: 'Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker',
      price: '$79.99',
      listPrice: '$149.99',
      store: 'Walmart',
      url: 'https://slickdeals.net/f/5',
      imageUrl: 'https://via.placeholder.com/300x200?text=Instant+Pot',
      thumbsUp: 567,
      comments: 145,
      views: 4700,
      timestamp: '10 hours ago',
      createdAt: '02-04-2026 08:45 AM',
      lastCommentedAt: '02-06-2026 11:55 PM'
    },
    {
      id: '6',
      title: 'Apple iPad Air (5th Gen) with M1 Chip',
      price: '$549.99',
      listPrice: '$599.99',
      store: 'Apple',
      url: 'https://slickdeals.net/f/6',
      imageUrl: 'https://via.placeholder.com/300x200?text=iPad+Air',
      thumbsUp: 712,
      comments: 198,
      views: 6300,
      timestamp: '12 hours ago',
      createdAt: '02-02-2026 03:30 PM',
      lastCommentedAt: '02-06-2026 09:20 PM'
    },
    {
      id: '7',
      title: 'Dyson V15 Detect Cordless Vacuum',
      price: '$549.99',
      listPrice: '$749.99',
      store: 'Dyson',
      url: 'https://slickdeals.net/f/7',
      imageUrl: 'https://via.placeholder.com/300x200?text=Dyson+Vacuum',
      thumbsUp: 423,
      comments: 87,
      views: 3100,
      timestamp: '14 hours ago',
      createdAt: '02-05-2026 06:00 PM',
      lastCommentedAt: '02-06-2026 07:45 PM'
    },
    {
      id: '8',
      title: 'Bose QuietComfort 45 Headphones',
      price: '$279.99',
      listPrice: '$329.99',
      store: 'Bose',
      url: 'https://slickdeals.net/f/8',
      imageUrl: 'https://via.placeholder.com/300x200?text=Bose+QC45',
      thumbsUp: 501,
      comments: 123,
      views: 4200,
      timestamp: '16 hours ago',
      createdAt: '02-03-2026 10:15 AM',
      lastCommentedAt: '02-06-2026 05:30 PM'
    },
    {
      id: '9',
      title: 'LG 27" UltraGear Gaming Monitor 144Hz',
      price: '$229.99',
      listPrice: '$349.99',
      store: 'Amazon',
      url: 'https://slickdeals.net/f/9',
      imageUrl: 'https://via.placeholder.com/300x200?text=LG+Monitor',
      thumbsUp: 634,
      comments: 167,
      views: 5800,
      timestamp: '18 hours ago',
      createdAt: '01-30-2026 01:00 PM',
      lastCommentedAt: '02-06-2026 03:15 PM'
    },
    {
      id: '10',
      title: 'Roku Streaming Stick 4K',
      price: '$34.99',
      listPrice: '$49.99',
      store: 'Roku',
      url: 'https://slickdeals.net/f/10',
      imageUrl: 'https://via.placeholder.com/300x200?text=Roku+Stick',
      thumbsUp: 289,
      comments: 54,
      views: 1900,
      timestamp: '20 hours ago',
      createdAt: '02-06-2026 07:30 AM',
      lastCommentedAt: '02-06-2026 01:00 PM'
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
