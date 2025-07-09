import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import OpeningHours from '../components/AcctiveTime';

interface GoogleMapsOptions {
  center: { lat: number; lng: number };
  zoom: number;
}

interface MarkerOptions {
  position: { lat: number; lng: number };
  map: unknown;
  draggable: boolean;
}

interface MarkerInstance {
  getPosition(): { lat(): number; lng(): number } | null;
}

interface GoogleMaps {
  maps: {
    Map: new (element: HTMLElement, options: GoogleMapsOptions) => unknown;
    Marker: new (options: MarkerOptions) => MarkerInstance;
    event: {
      addListener: (object: MarkerInstance, event: string, handler: () => void) => void;
    };
    Size: new (width: number, height: number) => { width: number; height: number };
  };
}

declare global {
  interface Window {
    google: GoogleMaps;
  }
}

export default function RestaurantForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    category: '',
    openingHours: '',
    lat: null as number | null,
    lng: null as number | null,
    rating: 0,
    image: null as File | null,
    reviews: [] as { content: string; reviewer: string }[],
    reviewContent: '',
    reviewer: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleOpeningHoursChange = (hours: { [key: string]: { open: string; close: string; closed: boolean } }) => {
    setFormData({ ...formData, openingHours: JSON.stringify(hours) });
  };

  const apiKey = 'AIzaSyC2tiKORNQDBhBRBj8Nxi0LGo4Gr8lG9v8';

  const fetchCoordinates = async (address: string) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      setFormData({ ...formData, lat: location.lat, lng: location.lng });
    }
  };

  useEffect(() => {
    if (formData.address) {
      fetchCoordinates(formData.address);
    }
  }, [formData.address]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2tiKORNQDBhBRBj8Nxi0LGo4Gr8lG9v8&libraries=places`;
      script.async = true;
      script.onload = () => {
        if (typeof window.google !== 'undefined') {
          const mapElement = document.getElementById('map') as HTMLElement;
          if (mapElement) {
            const map = new window.google.maps.Map(mapElement, {
              center: { lat: 35.6895, lng: 139.6917 },
              zoom: 15,
            });

            const marker = new window.google.maps.Marker({
              position: { lat: 35.7895, lng: 139.7917 },
              map,
              draggable: true,
            });

            window.google.maps.event.addListener(marker, 'dragend', async function () {
              const position = marker.getPosition();
              if (position) {
                const lat = position.lat();
                const lng = position.lng();
                const response = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
                );
                const data = await response.json();
                if (data.results.length > 0) {
                  const address = data.results[0].formatted_address;
                  setFormData({ ...formData, address, lat, lng });
                }
              }
            });
          }
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existingData = JSON.parse(localStorage.getItem('restaurants') || '[]');

    const existingRestaurantIndex = existingData.findIndex(
      (restaurant: { name: string; address: string }) =>
        restaurant.name === formData.name && restaurant.address === formData.address
    );

    if (existingRestaurantIndex !== -1) {
      const existingRestaurant = existingData[existingRestaurantIndex];

      const updatedRating =
        (existingRestaurant.rating * existingRestaurant.comments.length + formData.rating) /
        (existingRestaurant.comments.length + 1);

      const updatedComments = [
        ...existingRestaurant.comments,
        ...formData.reviews.map((review) => ({
          content: review.content,
          reviewer: review.reviewer,
        })),
      ];

      const updatedRestaurant = {
        ...existingRestaurant,
        rating: updatedRating,
        comments: updatedComments,
      };

      existingData[existingRestaurantIndex] = updatedRestaurant;
    } else {
      const newRestaurant = {
        ...formData,
        comments: formData.reviews.map((review) => ({
          content: review.content,
          reviewer: review.reviewer,
        })),
      };

      existingData.push(newRestaurant);
    }

    localStorage.setItem('restaurants', JSON.stringify(existingData));

    console.log('データが保存されました:', existingData);

    setFormData({
      name: '',
      address: '',
      category: '',
      openingHours: '',
      lat: null,
      lng: null,
      rating: 0,
      image: null,
      reviews: [],
      reviewContent: '',
      reviewer: '',
    });
  };

  const handleAddReview = () => {
    if (formData.reviewContent && formData.reviewer) {
      setFormData({
        ...formData,
        reviews: [
          ...formData.reviews,
          { content: formData.reviewContent, reviewer: formData.reviewer },
        ],
        reviewContent: '',
        reviewer: '',
      });
    }
  };

  return (
    <div className='bg-gray-100'>
      <Header />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-12 text-2xl font-semibold mb-4 text-center text-blue-500">レビュー作成</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="店名"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg mb-3 text-black"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="住所"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg mb-3 text-black"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="ジャンル"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg mb-3 text-black"
            required
          />
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">評価</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-2xl cursor-pointer ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>
          </div>
          <OpeningHours onChange={handleOpeningHoursChange} />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-700 rounded-lg mb-3 text-black"
          />
          <div className="mb-4">
            <input
              type="text"
              placeholder="レビュアー名"
              value={formData.reviewer}
              onChange={(e) => setFormData({ ...formData, reviewer: e.target.value })}
              className="w-full p-3 border border-gray-700 rounded-lg mb-2 text-black"
            />
            <textarea
              placeholder="レビュー内容"
              value={formData.reviewContent}
              onChange={(e) => setFormData({ ...formData, reviewContent: e.target.value })}
              className="w-full p-3 border border-gray-700 rounded-lg mb-2 text-black"
              rows={4}
            />
            <button
              type="button"
              onClick={handleAddReview}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              レビューを追加
            </button>
          </div>
          {formData.reviews.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold mb-2">追加されたレビュー:</h3>
              <ul>
                {formData.reviews.map((review, index) => (
                  <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
                    <strong>{review.reviewer}:</strong> {review.content}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button type="submit" className="bg-green-500 text-white w-full py-3 rounded-lg hover:bg-green-600">
            投稿
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
