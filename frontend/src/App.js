import React, { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Heart, ShoppingCart, Star, ArrowRight, Zap, Shield, Award, Search, Menu, User } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState(0);
  const [favorites, setFavorites] = useState(new Set());

  const featuredProducts = [
    {
      id: 1,
      name: "Wolfsburg Classic Badge",
      designName: "Heritage",
      colorName: "Mars Red",
      price: 45.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1627913434632-b4717be3485a",
      rating: 4.9,
      reviews: 127,
      badge: "Bestseller",
      inStock: true
    },
    {
      id: 2,
      name: "Eagle Shift Knob",
      designName: "Racing",
      colorName: "Matte Black",
      price: 89.99,
      originalPrice: 110.99,
      image: "https://images.unsplash.com/photo-1557245526-45dc0f1a8745",
      rating: 4.8,
      reviews: 89,
      badge: "Limited",
      inStock: true
    },
    {
      id: 3,
      name: "Vintage Dash Knob",
      designName: "Classic",
      colorName: "Pearl White",
      price: 34.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1618178325258-a123dc15f610",
      rating: 5.0,
      reviews: 203,
      badge: "Top Rated",
      inStock: true
    },
    {
      id: 4,
      name: "Custom Badge Set",
      designName: "Personalized",
      colorName: "Racing Green",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.pexels.com/photos/20430140/pexels-photo-20430140.jpeg",
      rating: 4.9,
      reviews: 156,
      badge: "Custom",
      inStock: true
    }
  ];

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const addToCart = () => {
    setCartItems(cartItems + 1);
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
                Kustom 
                <span className="block text-mars-red italic">Beetle</span>
                <span className="block text-4xl lg:text-5xl">Badges</span>
              </h1>
              
              <p className="text-xl text-pearl/90 mb-8 leading-relaxed max-w-lg">
                Transform your classic ride with premium, handcrafted badges that embody the spirit of the golden era. Every detail matters.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-mars-red hover:bg-mars-red/90 text-pearl px-8 py-4 text-lg font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-2xl"
                  onClick={addToCart}
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
              <h3 className="text-pearl font-bold text-lg mb-2">Lifetime Warranty</h3>
              <p className="text-pearl/70 text-sm">Built to last forever</p>
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
              <p className="text-pearl/70 text-sm">4.9/5 customer rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-pearl to-warm-beige">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-navy/10 text-navy border-navy/20 px-4 py-2 font-bold tracking-wide uppercase">
              Featured Collection
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
              Legendary 
              <span className="text-mars-red italic">Classics</span>
            </h2>
            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              Discover our most sought-after badges, crafted for the true enthusiast who demands perfection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={`${product.name} - ${product.designName} - ${product.colorName}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`
                      px-3 py-1 text-xs font-bold tracking-wide uppercase
                      ${product.badge === 'Bestseller' ? 'bg-mars-red text-pearl' : 
                        product.badge === 'Limited' ? 'bg-racing-green text-pearl' :
                        product.badge === 'Top Rated' ? 'bg-warm-beige text-navy' :
                        'bg-navy text-pearl'}
                    `}>
                      {product.badge}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 text-pearl hover:text-mars-red transition-colors duration-300"
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
                  <CardTitle className="text-lg font-bold text-navy group-hover:text-mars-red transition-colors duration-300">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-navy/70">{product.designName} • {product.colorName}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-navy">${product.price}</span>
                      <span className="text-lg text-navy/50 line-through">${product.originalPrice}</span>
                    </div>
                    <Badge className="bg-mars-red/10 text-mars-red text-xs">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </div>
                  
                  <Button 
                    className="w-full bg-navy hover:bg-mars-red text-pearl font-bold py-3 transition-all duration-300 hover:scale-105 shadow-lg"
                    onClick={addToCart}
                  >
                    Add to Cart
                    <ShoppingCart className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-navy text-navy hover:bg-navy hover:text-pearl px-8 py-4 text-lg font-bold tracking-wide transition-all duration-300"
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
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
            Limited Time
          </Badge>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-pearl mb-8 leading-tight">
            Your Dream Badge
            <span className="block text-mars-red italic">Awaits</span>
          </h2>
          
          <p className="text-xl text-pearl/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Beetle enthusiasts who've transformed their rides with our legendary badges. 
            Every purchase comes with our lifetime craftsmanship guarantee.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-mars-red hover:bg-mars-red/90 text-pearl px-12 py-6 text-xl font-bold tracking-wide transition-all duration-300 hover:scale-110 shadow-2xl"
              onClick={addToCart}
            >
              Start Your Journey
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
                Crafting premium badges for Volkswagen Beetle enthusiasts who demand perfection.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-pearl/70 hover:text-mars-red">F</Button>
                <Button variant="ghost" size="sm" className="text-pearl/70 hover:text-mars-red">T</Button>
                <Button variant="ghost" size="sm" className="text-pearl/70 hover:text-mars-red">I</Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-pearl font-bold text-lg mb-6">Shop</h4>
              <div className="space-y-3">
                <a href="#" className="block text-pearl/70 hover:text-mars-red transition-colors">All Products</a>
                <a href="#" className="block text-pearl/70 hover:text-mars-red transition-colors">Wolfsburg Collection</a>
                <a href="#" className="block text-pearl/70 hover:text-mars-red transition-colors">Eagle Series</a>
                <a href="#" className="block text-pearl/70 hover:text-mars-red transition-colors">Custom Badges</a>
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