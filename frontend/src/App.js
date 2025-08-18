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
        // You could add a toast notification here
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const getBadgeStyle = (category) => {
    const styles = {
      'Hood Badges': 'bg-mars-red text-pearl',
      'Shift Knobs': 'bg-racing-green text-pearl', 
      'Hood Crests': 'bg-warm-beige text-navy',
      'Horn Grills': 'bg-navy text-pearl'
    };
    return styles[category] || 'bg-matte-black text-pearl';
  };

  const getStockStatus = (stock) => {
    if (stock === -1) return { text: 'In Stock', color: 'text-racing-green' };
    if (stock > 10) return { text: 'In Stock', color: 'text-racing-green' };
    if (stock > 0) return { text: `Only ${stock} left`, color: 'text-warm-beige' };
    return { text: 'Out of Stock', color: 'text-mars-red' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-pearl to-warm-beige">
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 opacity-25 pointer-events-none noise-texture z-0"></div>
      
      {/* Header */}
      <header className="relative z-50 bg-navy/95 backdrop-blur-lg border-b border-navy/20 sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-mars-red to-racing-green rounded-full flex items-center justify-center">
                <span className="text-pearl font-bold text-xl">AK</span>
              </div>
              <div>
                <h1 className="text-pearl font-bold text-xl tracking-tight">Adam's Kustom Badges</h1>
                <p className="text-pearl/70 text-xs font-medium tracking-wide">SINCE 1970S</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#shop" className="text-pearl/90 hover:text-mars-red transition-colors duration-300 font-medium">Shop</a>
              <a href="#collections" className="text-pearl/90 hover:text-mars-red transition-colors duration-300 font-medium">Collections</a>
              <a href="#custom" className="text-pearl/90 hover:text-mars-red transition-colors duration-300 font-medium">Custom</a>
              <a href="#about" className="text-pearl/90 hover:text-mars-red transition-colors duration-300 font-medium">About</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-pearl hover:text-mars-red hover:bg-pearl/10">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-pearl hover:text-mars-red hover:bg-pearl/10">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-pearl hover:text-mars-red hover:bg-pearl/10 relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-mars-red text-pearl text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden text-pearl">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-racing-green/80"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1639164889329-874d81d027ff" 
            alt="Classic VW Beetle" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-mars-red/20 text-mars-red border-mars-red/30 px-4 py-2 text-sm font-bold tracking-wide uppercase">
                Legendary Since 1970s
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-pearl mb-6 leading-tight">
                Authentic 
                <span className="block text-mars-red italic">VW Beetle</span>
                <span className="block text-4xl lg:text-5xl">Badges</span>
              </h1>
              
              <p className="text-xl text-pearl/90 mb-8 leading-relaxed max-w-lg">
                Discover {products.length}+ handcrafted badges and accessories for your classic Volkswagen Beetle. Premium quality, authentic designs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-mars-red hover:bg-mars-red/90 text-pearl px-8 py-4 text-lg font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-2xl"
                  onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                >
                  Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-pearl text-pearl hover:bg-pearl hover:text-navy px-8 py-4 text-lg font-bold tracking-wide transition-all duration-300"
                >
                  Custom Design
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-mars-red/30 to-racing-green/30 rounded-full blur-3xl"></div>
                <div className="relative bg-pearl/10 backdrop-blur-sm rounded-full border border-pearl/20 w-full h-full flex items-center justify-center">
                  <div className="text-8xl lg:text-9xl text-pearl opacity-40">🚗</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative z-10 py-16 bg-matte-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-mars-red/20 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-mars-red" />
              </div>
              <h3 className="text-pearl font-bold text-lg mb-2">Premium Quality</h3>
              <p className="text-pearl/70 text-sm">Handcrafted with precision</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-racing-green/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-racing-green" />
              </div>
              <h3 className="text-pearl font-bold text-lg mb-2">Authentic Fit</h3>
              <p className="text-pearl/70 text-sm">Fits like original VW parts</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-warm-beige/20 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-warm-beige" />
              </div>
              <h3 className="text-pearl font-bold text-lg mb-2">Fast Shipping</h3>
              <p className="text-pearl/70 text-sm">2-3 days delivery</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-mars-red/20 rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-mars-red" />
              </div>
              <h3 className="text-pearl font-bold text-lg mb-2">5,000+ Reviews</h3>
              <p className="text-pearl/70 text-sm">4.8/5 customer rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="products" className="relative z-10 py-24 bg-gradient-to-b from-pearl to-warm-beige">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-navy/10 text-navy border-navy/20 px-4 py-2 font-bold tracking-wide uppercase">
              Our Complete Collection
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
              Premium VW Beetle 
              <span className="text-mars-red italic"> Badges</span>
            </h2>
            <p className="text-xl text-navy/70 max-w-2xl mx-auto mb-8">
              Authentic badges, shift knobs, and accessories crafted for the true VW enthusiast.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy/50 h-5 w-5" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-navy/20 text-navy placeholder:text-navy/50"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-white border-navy/20 text-navy">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
              <p className="text-navy/70 mt-4">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-navy/70 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <Card key={product.id} className="group bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-contain bg-gray-50 group-hover:scale-110 transition-transform duration-700 p-4"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">Image not available</div>';
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`px-3 py-1 text-xs font-bold tracking-wide uppercase ${getBadgeStyle(product.category)}`}>
                          {product.category}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4 text-matte-black hover:text-mars-red transition-colors duration-300"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart className={`h-5 w-5 ${favorites.has(product.id) ? 'fill-current text-mars-red' : ''}`} />
                      </Button>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-warm-beige fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="text-sm text-navy/70 ml-2">({product.reviews})</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg font-bold text-navy group-hover:text-mars-red transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </CardTitle>
                      <p className="text-sm text-navy/70 line-clamp-2">{product.description}</p>
                      <p className={`text-sm font-medium ${stockStatus.color}`}>
                        {stockStatus.text}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-navy">${product.price}</span>
                          {product.original_price && (
                            <>
                              <span className="text-lg text-navy/50 line-through">${product.original_price}</span>
                              <Badge className="bg-mars-red/10 text-mars-red text-xs">
                                Save ${(product.original_price - product.price).toFixed(2)}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-navy hover:bg-mars-red text-pearl font-bold py-3 transition-all duration-300 hover:scale-105 shadow-lg"
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
            <div className="text-center mt-12">
              <p className="text-navy/70 mb-4">Showing {products.length} products</p>
              <Button 
                variant="outline" 
                className="border-navy text-navy hover:bg-navy hover:text-pearl px-8 py-4 text-lg font-bold tracking-wide transition-all duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-24 bg-gradient-to-r from-navy via-matte-black to-racing-green overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1617829590022-a0b870857b6e" 
            alt="Classic Red VW Beetle" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-mars-red/20 text-mars-red border-mars-red/30 px-6 py-3 text-lg font-bold tracking-wide uppercase">
            Ready to Transform Your Beetle?
          </Badge>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-pearl mb-8 leading-tight">
            Your Perfect Badge
            <span className="block text-mars-red italic">Awaits</span>
          </h2>
          
          <p className="text-xl text-pearl/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of VW Beetle enthusiasts who've transformed their rides with our authentic badges. 
            Premium quality, perfect fit, legendary craftsmanship.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-mars-red hover:bg-mars-red/90 text-pearl px-12 py-6 text-xl font-bold tracking-wide transition-all duration-300 hover:scale-110 shadow-2xl"
              onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Collection
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <div className="flex items-center space-x-4 text-pearl/80">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-mars-red to-racing-green border-2 border-pearl"></div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">5,000+ Happy Customers</p>
                <p className="text-xs">Join the family</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-matte-black py-16 border-t border-pearl/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-mars-red to-racing-green rounded-full flex items-center justify-center">
                  <span className="text-pearl font-bold">AK</span>
                </div>
                <div>
                  <h3 className="text-pearl font-bold text-lg">Adam's Kustom Badges</h3>
                  <p className="text-pearl/60 text-xs">SINCE 1970S</p>
                </div>
              </div>
              <p className="text-pearl/70 mb-6 leading-relaxed">
                Crafting premium badges for Volkswagen Beetle enthusiasts who demand authenticity and quality.
              </p>
            </div>
            
            <div>
              <h4 className="text-pearl font-bold text-lg mb-6">Categories</h4>
              <div className="space-y-3">
                {categories.slice(0, 4).map(category => (
                  <button 
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-pearl/70 hover:text-mars-red transition-colors text-left"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-pearl font-bold text-lg mb-6">Support</h4>
              <div className="space-y-3">
                <a href="#" className="block text-pearl/70 hover:text-mars-red transition-colors">Fitment Guide</a>
                <a href="#" className="block text-pearl/70 hover:text-mars-red transition-colors">Installation</a>
                <a href="#" className="block text-pearl/70 hover:text-mars-red transition-colors">Warranty</a>
                <a href="#" className="block text-pearl/70 hover:text-mars-red transition-colors">Returns</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-pearl font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-pearl/70 mb-4">Get exclusive drops and vintage finds</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-pearl/10 border-pearl/20 text-pearl placeholder:text-pearl/50"
                />
                <Button className="bg-mars-red hover:bg-mars-red/90 px-6">
                  Join
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-pearl/10 mt-12 pt-8 text-center">
            <p className="text-pearl/60 text-sm">
              © 2024 Adam's Kustom Badges. All rights reserved. | 
              <span className="text-pearl/40"> Not affiliated with Volkswagen AG. Product names used for fitment compatibility only.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}