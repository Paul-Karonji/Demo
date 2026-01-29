/**
 * StorageManager - Handles all localStorage operations
 */
class StorageManager {
  constructor(prefix = 'hms_') {
    this.prefix = prefix;
  }

  /**
   * Get all items from a collection
   */
  getAll(collection) {
    try {
      const data = localStorage.getItem(this.prefix + collection);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error getting ${collection}:`, error);
      return [];
    }
  }

  /**
   * Get single item by ID
   */
  getById(collection, id) {
    const items = this.getAll(collection);
    return items.find(item => item.id === id);
  }

  /**
   * Add new item to collection
   */
  add(collection, item) {
    try {
      const items = this.getAll(collection);
      items.push(item);
      this.save(collection, items);
      return item;
    } catch (error) {
      console.error(`Error adding to ${collection}:`, error);
      return null;
    }
  }

  /**
   * Update existing item
   */
  update(collection, id, updates) {
    try {
      const items = this.getAll(collection);
      const index = items.findIndex(item => item.id === id);
      
      if (index !== -1) {
        items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
        this.save(collection, items);
        return items[index];
      }
      
      return null;
    } catch (error) {
      console.error(`Error updating ${collection}:`, error);
      return null;
    }
  }

  /**
   * Delete item from collection
   */
  delete(collection, id) {
    try {
      const items = this.getAll(collection);
      const filtered = items.filter(item => item.id !== id);
      this.save(collection, filtered);
      return true;
    } catch (error) {
      console.error(`Error deleting from ${collection}:`, error);
      return false;
    }
  }

  /**
   * Save entire collection
   */
  save(collection, data) {
    try {
      localStorage.setItem(this.prefix + collection, JSON.stringify(data));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded');
        alert('Storage limit reached. Please clear some data.');
      } else {
        console.error(`Error saving ${collection}:`, error);
      }
    }
  }

  /**
   * Clear all HMS data
   */
  clearAll() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  /**
   * Search collection with filters
   */
  search(collection, filters) {
    const items = this.getAll(collection);
    
    return items.filter(item => {
      return Object.keys(filters).every(key => {
        const filterValue = filters[key];
        const itemValue = item[key];
        
        // Function filter
        if (typeof filterValue === 'function') {
          return filterValue(itemValue);
        }
        
        // String contains (case-insensitive)
        if (typeof filterValue === 'string' && typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(filterValue.toLowerCase());
        }
        
        // Exact match
        return itemValue === filterValue;
      });
    });
  }

  /**
   * Paginate results
   */
  paginate(items, page = 1, perPage = 20) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    
    return {
      data: items.slice(start, end),
      total: items.length,
      page,
      perPage,
      totalPages: Math.ceil(items.length / perPage),
      hasNext: end < items.length,
      hasPrev: page > 1
    };
  }

  /**
   * Get storage usage statistics
   */
  getStats() {
    let totalSize = 0;
    const collections = {};
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        const size = localStorage.getItem(key).length;
        totalSize += size;
        const collectionName = key.replace(this.prefix, '');
        collections[collectionName] = {
          size,
          count: this.getAll(collectionName).length
        };
      }
    });
    
    return {
      totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      collections
    };
  }
}

// Initialize global storage manager
const storage = new StorageManager();
