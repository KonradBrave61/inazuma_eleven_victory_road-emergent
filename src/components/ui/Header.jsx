import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Characters', path: '/character-gallery-dashboard', icon: 'Users' },
    { label: 'Team Builder', path: '/team-builder-formation-manager', icon: 'Shield' },
    { label: 'Data Management', path: '/data-import-management', icon: 'Database' }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-100 bg-surface border-b border-border gaming-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/character-gallery-dashboard" className="flex items-center space-x-3 gaming-transition hover:opacity-80">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading-bold text-text-primary">
                  Inazuma Eleven
                </h1>
                <p className="text-xs text-text-secondary font-caption-normal">
                  Victory Road
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg gaming-transition ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-body-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search characters..."
                className="w-64 pl-10 bg-input border-border text-input-foreground placeholder-muted-foreground"
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </div>
            <Button variant="ghost" className="p-2">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" className="p-2">
              <Icon name="Settings" size={20} />
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <Button 
              variant="ghost" 
              className="p-2"
              onClick={toggleSearch}
            >
              <Icon name="Search" size={20} />
            </Button>
            <Button 
              variant="ghost" 
              className="p-2"
              onClick={toggleMobileMenu}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search characters..."
                className="w-full pl-10 bg-input border-border text-input-foreground placeholder-muted-foreground"
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg gaming-transition ${
                    isActiveRoute(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-body-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-border flex space-x-2">
              <Button variant="ghost" className="flex-1 justify-center">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" className="flex-1 justify-center">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;