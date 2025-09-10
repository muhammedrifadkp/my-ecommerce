'use client';

import Image from 'next/image';

export default function ImageTest() {
    const testImages = [
        '/Luxury-Gift/luxury-gift-set-299.webp',
        '/Luxury-Gift/Luxury-Gift-dry-fruits-199.jpg',
        '/Luxury-Gift/Luxury-dry-Gift-149.jpg',
        '/Luxury-Gift/Luxury-Gift-99.jpeg'
    ];

    return (
        <div className=\"p-8\">
            < h2 className =\"text-2xl font-bold mb-4\">Image Loading Test</h2>
                < div className =\"grid grid-cols-2 gap-4\">
    {
        testImages.map((imagePath, index) => (
            <div key={index} className=\"border p-4\">
        < h3 className =\"text-sm font-medium mb-2\">{imagePath}</h3>
        < div className =\"relative w-full h-48 bg-gray-100\">
        < Image
                src = { imagePath }
                alt = {`Test image ${index + 1}`}
    fill
    className =\"object-cover\"
    onError = {(e) => {
        console.error('Failed to load:', imagePath);
        e.target.style.display = 'none';
        e.target.parentElement.innerHTML = '<div class=\"flex items-center justify-center h-full text-red-500\">❌ Failed to load</div>';
    }
}
onLoad = {() => {
    console.log('✅ Loaded successfully:', imagePath);
}}
              />
            </div >
          </div >
        ))}
      </div >
    </div >
  );
}