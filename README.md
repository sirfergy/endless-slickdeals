# endless-slickdeals

An endless scrolling web application that scrapes and displays deals from [Slickdeals.net](https://slickdeals.net/forums/forumdisplay.php?f=9) with a mobile-friendly interface.

## Features

- 🔄 **Endless Scrolling**: Automatically loads more deals as you scroll
- 📱 **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- ⚡ **Fast**: Efficient pagination and caching
- 🔍 **Deal Information**: Shows price, store, votes, and comments

## Technology Stack

- **Backend**: TypeScript, Node.js, Express
- **Scraping**: Axios, Cheerio
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Build**: TypeScript compiler

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sirfergy/endless-slickdeals.git
cd endless-slickdeals
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development Mode

Run the development server with auto-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Mode

1. Build the TypeScript code:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

## API Endpoints

### GET /api/deals

Fetch deals with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)

**Response:**
```json
{
  "page": 1,
  "deals": [
    {
      "id": "12345",
      "title": "Amazing Deal Title",
      "price": "$99.99",
      "store": "Amazon",
      "url": "https://slickdeals.net/...",
      "imageUrl": "https://...",
      "thumbsUp": 150,
      "thumbsDown": 5,
      "comments": 42,
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ],
  "hasMore": true
}
```

### GET /api/health

Health check endpoint.

## Project Structure

```
endless-slickdeals/
├── src/
│   ├── server.ts       # Express server
│   └── scraper.ts      # Slickdeals scraper service
├── public/
│   ├── index.html      # Main HTML page
│   ├── styles.css      # Styles and responsive design
│   └── app.js          # Frontend JavaScript
├── dist/               # Compiled TypeScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

1. **Backend Server**: Express server serves the frontend and provides API endpoints
2. **Scraper Service**: Fetches and parses deal data from Slickdeals.net using Cheerio
3. **Frontend**: Vanilla JavaScript implements endless scrolling by detecting when user scrolls near the bottom
4. **Responsive Design**: CSS Grid and media queries ensure mobile compatibility

## Notes

- This project is for educational purposes only
- Respects the Slickdeals website by using appropriate headers and rate limiting
- Deal data belongs to Slickdeals.net

## License

ISC
