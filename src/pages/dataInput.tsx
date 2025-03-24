import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import OpeningHours from '../components/AcctiveTime';
import AppLayout from '@/components/AppLayout';

declare global {
  interface Window {
    google: any;
  }
}

export default function RestaurantForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    category: '',
    openingHours: '',
    lat: null,
    lng: null,
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
          const map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
            center: { lat: 35.6895, lng: 139.6917 },
            zoom: 15,
          });

          const marker = new window.google.maps.Marker({
            position: { lat: 35.7895, lng: 139.7917 },
            map,
            draggable: true,
          });

          window.google.maps.event.addListener(marker, 'dragend', async function () {
            const lat = marker.getPosition()?.lat();
            const lng = marker.getPosition()?.lng();
            if (lat && lng) {
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
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existingData = JSON.parse(localStorage.getItem('restaurants') || '[]');

    const existingRestaurantIndex = existingData.findIndex(
      (restaurant: any) =>
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
            placeholder="ジャンル (例: カフェ, ラーメン)"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg mb-3 text-black"
            required
          />
          <OpeningHours onChange={handleOpeningHoursChange} />
          <div className="flex mb-3 items-center">
            <p className="text-black mr-2">評価 :</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${star <= formData.rating ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2">写真の挿入</label>
            <div className="flex items-center">
              <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-blue-500 border-2 border-blue-500 duration-500 ease-in-out">
                ファイルを選択
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {formData.image && (
                <span className="ml-2 text-black">{formData.image.name}</span>
              )}
            </div>
          </div>
          <div id="map" className="w-full h-64 mb-4 rounded-lg"></div>
          <div className="mb-4">
            <label className="block text-black mb-2">口コミ</label>
            <textarea
              name="reviewContent"
              placeholder="口コミを入力してください"
              value={formData.reviewContent}
              onChange={(e) => setFormData({ ...formData, reviewContent: e.target.value })}
              className="w-full p-3 border border-gray-700 rounded-lg mb-3 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2">口コミ投稿者名</label>
            <input
              type="text"
              name="reviewer"
              placeholder="投稿者名を入力してください"
              value={formData.reviewer}
              onChange={(e) => setFormData({ ...formData, reviewer: e.target.value })}
              className="w-full p-3 border border-gray-700 rounded-lg mb-3 text-black"
            />
          </div>
          <button
            type="button"
            onClick={handleAddReview}
            className="bg-green-500 text-white px-4 py-2 border-2 border-green-500 rounded-lg hover:bg-white hover:text-green-500 duration-500 ease-in-out mb-4"
          >
            口コミを追加
          </button>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">追加された口コミ</h3>
            {formData.reviews.length > 0 ? (
              <ul className="list-disc pl-5">
                {formData.reviews.map((review, index) => (
                  <li key={index} className="mb-2">
                    <p className="text-gray-700"><strong>{review.reviewer}:</strong> {review.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">まだ口コミが追加されていません。</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mb-6 bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 shadow-[0_4px_0_#1e3a8a] hover:translate-y-[3px] hover:shadow-none duration-300 ease-in-out font-bold"
          >
            登録
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
