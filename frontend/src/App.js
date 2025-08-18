import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Heart, ShoppingCart, Star, ArrowRight, Zap, Shield, Award, Search, Menu, User, Filter } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`${BACKEND_URL}/api/products?${params}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/categories`);
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1
        })
      });
      
      if (response.ok) {
        setCartItems(cartItems + 1);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const getBadgeStyle = (category) => {
    const styles = {
      'Hood Badges': 'bg-mars-red text-pure-white',
      'Shift Knobs': 'bg-neon-green text-pure-white', 
      'Hood Crests': 'bg-gold-accent text-charcoal',
      'Horn Grills': 'bg-electric-blue text-pure-white'
    };
    return styles[category] || 'bg-steel-gray text-pure-white';
  };

  const getStockStatus = (stock) => {
    if (stock === -1) return { text: 'In Stock', color: 'text-neon-green' };
    if (stock > 10) return { text: 'In Stock', color: 'text-neon-green' };
    if (stock > 0) return { text: `Only ${stock} left`, color: 'text-gold-accent' };
    return { text: 'Out of Stock', color: 'text-mars-red' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-black via-charcoal to-graphite">
      {/* Modern Grain Texture Overlay */}
      <div className="fixed inset-0 opacity-30 pointer-events-none modern-grain z-0"></div>
      
      {/* Header */}
      <header className="relative z-50 bg-charcoal/95 backdrop-blur-lg border-b border-steel-gray/30 sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-mars-red to-amber rounded-full flex items-center justify-center neon-glow">
                <span className="text-pure-white font-bold text-xl">AK</span>
              </div>
              <div>
                <h1 className="text-pure-white font-bold text-xl tracking-tight">Adam's Kustom Badges</h1>
                <p className="text-silver text-xs font-medium tracking-wide">SINCE 1970S</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#shop" className="text-silver hover:text-mars-red transition-colors duration-300 font-medium">Shop</a>
              <a href="#collections" className="text-silver hover:text-mars-red transition-colors duration-300 font-medium">Collections</a>
              <a href="#custom" className="text-silver hover:text-mars-red transition-colors duration-300 font-medium">Custom</a>
              <a href="#about" className="text-silver hover:text-mars-red transition-colors duration-300 font-medium">About</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-silver hover:text-mars-red hover:bg-steel-gray/20">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-silver hover:text-mars-red hover:bg-steel-gray/20">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-silver hover:text-mars-red hover:bg-steel-gray/20 relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-mars-red text-pure-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold neon-glow">
                    {cartItems}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden text-silver">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Custom Shift Knob Background */}
      <section className="relative z-10 py-32 overflow-hidden min-h-[80vh] flex items-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/hero-shift-knob.png" 
            alt="Premium VW Shift Knob" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        {/* Classic Beetle Background (Secondary Layer) */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1639164889329-874d81d027ff" 
            alt="Classic VW Beetle" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Hero Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient-dark"></div>
        
        <div className="relative z-20 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="modern-badge mb-6">
                Legendary Since 1970s
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight hero-title-dark">
                Premium 
                <span className="block accent-text-dark italic">VW Beetle</span>
                <span className="block text-5xl lg:text-6xl">Badges</span>
              </h1>
              
              <p className="text-xl text-silver mb-10 leading-relaxed max-w-lg">
                Discover {products.length}+ handcrafted badges and accessories for your classic Volkswagen Beetle. Premium quality, authentic designs, modern craftsmanship.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button 
                  className="btn-premium-dark"
                  onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Collection <ArrowRight className="ml-3 h-6 w-6" />
                </button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-silver text-silver hover:bg-silver hover:text-charcoal px-8 py-4 text-lg font-bold tracking-wide transition-all duration-300 backdrop-blur-sm"
                >
                  Custom Design
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-96 h-96 mx-auto lg:w-[500px] lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-mars-red/20 to-amber/20 rounded-full blur-3xl"></div>
                <div className="relative glass-effect-dark rounded-full w-full h-full flex items-center justify-center border-2 border-steel-gray">
                  <div className="text-9xl lg:text-[12rem] text-silver opacity-30">🚗</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Trust Indicators */}
      <section className="relative z-10 py-20 bg-graphite/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-mars-red/20 to-mars-red/10 rounded-full flex items-center justify-center mb-6 border border-mars-red/30">
                <Award className="h-10 w-10 text-mars-red" />
              </div>
              <h3 className="text-pure-white font-bold text-lg mb-2">Premium Quality</h3>
              <p className="text-silver text-sm">Handcrafted precision</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-neon-green/20 to-neon-green/10 rounded-full flex items-center justify-center mb-6 border border-neon-green/30">
                <Shield className="h-10 w-10 text-neon-green" />
              </div>
              <h3 className="text-pure-white font-bold text-lg mb-2">Authentic Fit</h3>
              <p className="text-silver text-sm">Original VW compatibility</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-accent/20 to-gold-accent/10 rounded-full flex items-center justify-center mb-6 border border-gold-accent/30">
                <Zap className="h-10 w-10 text-gold-accent" />
              </div>
              <h3 className="text-pure-white font-bold text-lg mb-2">Fast Shipping</h3>
              <p className="text-silver text-sm">2-3 days delivery</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-electric-blue/20 to-electric-blue/10 rounded-full flex items-center justify-center mb-6 border border-electric-blue/30">
                <Star className="h-10 w-10 text-electric-blue" />
              </div>
              <h3 className="text-pure-white font-bold text-lg mb-2">5,000+ Reviews</h3>
              <p className="text-silver text-sm">4.8/5 customer rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Product Catalog */}
      <section id="products" className="relative z-10 py-24 bg-gradient-to-b from-charcoal to-graphite">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="modern-badge mb-6">
              Our Complete Collection
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 hero-title-dark">
              Authentic VW Beetle 
              <span className="accent-text-dark italic block"> Accessories</span>
            </h2>
            <p className="text-xl text-silver max-w-3xl mx-auto mb-10 leading-relaxed">
              Premium badges, shift knobs, and accessories crafted for the true VW enthusiast who demands perfection.
            </p>

            {/* Modern Search and Filter */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-silver h-5 w-5" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-steel-gray/50 border-steel-gray text-pure-white placeholder:text-silver backdrop-blur-sm h-12"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-56 bg-steel-gray/50 border-steel-gray text-pure-white backdrop-blur-sm h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-graphite border-steel-gray">
                  <SelectItem value="all" className="text-pure-white hover:bg-steel-gray">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="text-pure-white hover:bg-steel-gray">{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Modern Products Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-mars-red"></div>
              <p className="text-silver mt-6 text-lg">Loading premium products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-silver text-xl">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <Card key={product.id} className="product-card-dark group overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-72 object-contain bg-steel-gray/20 group-hover:scale-110 transition-transform duration-700 p-6"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-72 bg-steel-gray/20 flex items-center justify-center text-silver">Image not available</div>';
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`px-4 py-2 text-xs font-bold tracking-wide uppercase ${getBadgeStyle(product.category)}`}>
                          {product.category}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4 text-silver hover:text-mars-red transition-colors duration-300"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart className={`h-6 w-6 ${favorites.has(product.id) ? 'fill-current text-mars-red' : ''}`} />
                      </Button>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-gold-accent fill-current' : 'text-steel-gray'}`} 
                            />
                          ))}
                          <span className="text-sm text-silver ml-2">({product.reviews})</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg font-bold text-pure-white group-hover:text-mars-red transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </CardTitle>
                      <p className="text-sm text-silver line-clamp-2 leading-relaxed">{product.description}</p>
                      <p className={`text-sm font-medium ${stockStatus.color}`}>
                        {stockStatus.text}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-bold text-pure-white">${product.price}</span>
                          {product.original_price && (
                            <>
                              <span className="text-lg text-silver line-through">${product.original_price}</span>
                              <Badge className="bg-mars-red/20 text-mars-red text-xs border border-mars-red/30">
                                Save ${(product.original_price - product.price).toFixed(2)}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-mars-red to-amber text-pure-white font-bold py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={() => addToCart(product.id)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        {product.stock !== 0 && <ShoppingCart className="ml-2 h-4 w-4" />}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {products.length > 0 && (
            <div className="text-center mt-16">
              <p className="text-silver mb-6">Showing {products.length} premium products</p>
              <Button 
                variant="outline" 
                className="border-silver text-silver hover:bg-silver hover:text-charcoal px-10 py-4 text-lg font-bold tracking-wide transition-all duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modern Call to Action */}
      <section className="relative z-10 py-28 bg-gradient-to-r from-deep-black via-charcoal to-graphite overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1617829590022-a0b870857b6e" 
            alt="Classic Red VW Beetle" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-6 text-center">
          <div className="modern-badge mb-8">
            Transform Your Beetle
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-bold mb-10 leading-tight hero-title-dark">
            Your Perfect Badge
            <span className="block accent-text-dark italic">Awaits</span>
          </h2>
          
          <p className="text-xl text-silver mb-16 max-w-4xl mx-auto leading-relaxed">
            Join thousands of VW Beetle enthusiasts who've transformed their rides with our premium badges. 
            Exceptional quality, perfect fit, legendary craftsmanship since the 1970s.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button 
              className="btn-premium-dark text-xl px-16 py-6"
              onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Collection
              <ArrowRight className="ml-4 h-7 w-7" />
            </button>
            
            <div className="flex items-center space-x-6 text-silver">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-mars-red to-amber border-2 border-charcoal neon-glow"></div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-pure-white">5,000+ Happy Customers</p>
                <p className="text-sm">Join the premium family</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 bg-deep-black py-20 border-t border-steel-gray/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-mars-red to-amber rounded-full flex items-center justify-center neon-glow">
                  <span className="text-pure-white font-bold text-xl">AK</span>
                </div>
                <div>
                  <h3 className="text-pure-white font-bold text-lg">Adam's Kustom Badges</h3>
                  <p className="text-silver text-xs">SINCE 1970S</p>
                </div>
              </div>
              <p className="text-silver mb-8 leading-relaxed">
                Crafting premium badges for Volkswagen Beetle enthusiasts who demand authenticity, quality, and style.
              </p>
            </div>
            
            <div>
              <h4 className="text-pure-white font-bold text-lg mb-8">Categories</h4>
              <div className="space-y-4">
                {categories.slice(0, 4).map(category => (
                  <button 
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-silver hover:text-mars-red transition-colors text-left"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-pure-white font-bold text-lg mb-8">Support</h4>
              <div className="space-y-4">
                <a href="#" className="block text-silver hover:text-mars-red transition-colors">Fitment Guide</a>
                <a href="#" className="block text-silver hover:text-mars-red transition-colors">Installation</a>
                <a href="#" className="block text-silver hover:text-mars-red transition-colors">Warranty</a>
                <a href="#" className="block text-silver hover:text-mars-red transition-colors">Returns</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-pure-white font-bold text-lg mb-8">Newsletter</h4>
              <p className="text-silver mb-6">Get exclusive drops and vintage finds</p>
              <div className="flex gap-3">
                <Input 
                  placeholder="Your email" 
                  className="bg-steel-gray/50 border-steel-gray text-pure-white placeholder:text-silver"
                />
                <Button className="bg-gradient-to-r from-mars-red to-amber px-8">
                  Join
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-steel-gray/20 mt-16 pt-8 text-center">
            <p className="text-silver text-sm">
              © 2024 Adam's Kustom Badges. All rights reserved. | 
              <span className="text-steel-gray"> Not affiliated with Volkswagen AG. Product names used for fitment compatibility only.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}