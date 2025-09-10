# Image Placement Guide

All images have been replaced with local paths. Create these folders in your `public` directory and add your images:

## Required Directory Structure

```
front-end/public/images/
├── banners/
│   ├── dry-fruits-banner.jpg     (800x400px - for PromoCarousel)
│   ├── nuts-seeds-banner.jpg     (800x400px - for PromoCarousel)
│   └── dates-exotic-banner.jpg   (800x400px - for PromoCarousel)
├── categories/
│   ├── dry-fruits.jpg            (400x300px - for category cards)
│   ├── nuts-seeds.jpg            (400x300px - for category cards)
│   └── dates-exotic.jpg          (400x300px - for category cards)
├── hero/
│   ├── hero-main.jpg             (800x600px - main hero image)
│   └── hero-fallback.jpg         (800x600px - fallback hero image)
├── products/
│   ├── almonds.jpg               (500x500px - product images)
│   ├── dates.jpg
│   ├── dried-fruits.jpg
│   ├── pistachios.jpg
│   ├── cashews.jpg
│   ├── walnuts.jpg
│   ├── apricots.jpg
│   └── placeholder.jpg           (300x300px - default product image)
└── orders/
    ├── order-1.jpg               (100x100px - order item images)
    └── order-2.jpg
```

## Quick Setup Steps

1. Create the directory structure above in `front-end/public/images/`
2. Add your images with the exact filenames shown
3. Restart your development server: `npm run dev`
4. All image errors will be resolved!

## Image Specifications

- **Hero Images**: 800x600px, JPG format, < 500KB
- **Category Images**: 400x300px, JPG format, < 300KB  
- **Banner Images**: 800x400px, JPG format, < 400KB
- **Product Images**: 500x500px, JPG format, < 200KB
- **Order Images**: 100x100px, JPG format, < 50KB

## Notes

- All external Unsplash images have been removed
- No more 404 image errors will occur
- Images load from your local public folder
- Better performance and reliability
- You have full control over image quality