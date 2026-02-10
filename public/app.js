// Endless scrolling for Slickdeals
class EndlessSlickdeals {
  constructor() {
    this.currentPage = 1;
    this.isLoading = false;
    this.hasMore = true;
    this.seenIds = new Set();
    this.SCROLL_THRESHOLD_PX = 500; // Pixels from bottom to trigger load
    this.dealsContainer = document.getElementById('deals-container');
    this.loadingElement = document.getElementById('loading');
    this.errorElement = document.getElementById('error');
    
    this.init();
  }
  
  init() {
    // Load version
    this.loadVersion();
    
    // Load initial deals
    this.loadDeals();
    
    // Set up infinite scroll
    window.addEventListener('scroll', () => this.handleScroll());
  }
  
  async loadVersion() {
    try {
      const response = await fetch('/api/version');
      if (response.ok) {
        const data = await response.json();
        document.getElementById('version').textContent = `v${data.version}`;
      }
    } catch (e) {
      // ignore
    }
  }
  
  handleScroll() {
    // Check if user has scrolled near bottom
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - this.SCROLL_THRESHOLD_PX;
    
    if (scrollPosition >= threshold && !this.isLoading && this.hasMore) {
      this.loadDeals();
    }
  }
  
  async loadDeals() {
    if (this.isLoading || !this.hasMore) return;
    
    this.isLoading = true;
    this.loadingElement.classList.remove('hidden');
    this.errorElement.style.display = 'none';
    
    try {
      const response = await fetch(`/api/deals?page=${this.currentPage}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch deals');
      }
      
      const data = await response.json();
      
      if (data.deals && data.deals.length > 0) {
        this.renderDeals(data.deals);
        this.currentPage++;
        this.hasMore = data.hasMore;
      } else {
        this.hasMore = false;
      }
      
    } catch (error) {
      console.error('Error loading deals:', error);
      this.errorElement.style.display = 'block';
    } finally {
      this.isLoading = false;
      
      if (!this.hasMore) {
        this.loadingElement.style.display = 'none';
      } else {
        this.loadingElement.classList.add('hidden');
      }
    }
  }
  
  renderDeals(deals) {
    deals.forEach(deal => {
      const key = deal.id || deal.url;
      if (this.seenIds.has(key)) return;
      this.seenIds.add(key);
      const card = this.createDealCard(deal);
      this.dealsContainer.appendChild(card);
    });
  }
  
  createDealCard(deal) {
    const card = document.createElement('div');
    card.className = 'deal-card';
    card.onclick = () => window.open(deal.url, '_blank');
    
    let html = '';
    
    // Add image if available
    if (deal.imageUrl && deal.imageUrl.trim() && !deal.imageUrl.includes('spacer.gif')) {
      html += `<img src="${this.escapeHtml(deal.imageUrl)}" alt="${this.escapeHtml(deal.title)}" class="image" onerror="this.style.display='none'">`;
    }
    
    // Add store badge
    if (deal.store) {
      html += `<div class="store">${this.escapeHtml(deal.store)}</div>`;
    }
    
    // Add title
    html += `<h2>${this.escapeHtml(deal.title)}</h2>`;
    
    // Add price if available
    if (deal.price) {
      html += `<div class="price">${this.escapeHtml(deal.price)}</div>`;
    }
    
    // Add metadata (votes, views, and comments)
    html += `
      <div class="meta">
        <div class="votes">
          <span class="vote-count thumbs-up">👍 ${deal.thumbsUp || 0}</span>
        </div>
        <span class="comments">👁️ ${(deal.views || 0).toLocaleString()}</span>
        <span class="comments">💬 ${deal.comments || 0}</span>
      </div>
    `;
    
    // Add timestamps (created and last commented)
    if (deal.createdAt || deal.lastCommentedAt) {
      html += `<div class="timestamps">`;
      if (deal.createdAt) {
        html += `<span class="timestamp-item">📅 Posted: ${this.escapeHtml(deal.createdAt)}</span>`;
      }
      if (deal.lastCommentedAt) {
        html += `<span class="timestamp-item">💬 Last comment: ${this.escapeHtml(deal.lastCommentedAt)}</span>`;
      }
      html += `</div>`;
    }
    
    card.innerHTML = html;
    return card;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new EndlessSlickdeals());
} else {
  new EndlessSlickdeals();
}
