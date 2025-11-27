import { useParams } from "react-router-dom";

const allPhotos = {
  architecture: [
    "/assets/architecture1.jpg",
    "/assets/architecture2.jpg",
    "/assets/architecture3.jpg"
  ],
  nature: [
    "/assets/nature1.jpg",
    "/assets/nature2.jpg",
    "/assets/nature3.jpg"
  ],
  portrait: [
    "/assets/portrait1.jpg",
    "/assets/portrait2.jpg",
    "/assets/portrait3.jpg"
  ]
};

export default function CategoryPage() {
  const { type } = useParams(); // "nature", "portrait", "architecture"
  const images = allPhotos[type];

  return (
    <div className="category-page">
      <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>

      <div className="photo-grid">
        {images.map((src, index) => (
          <div key={index} className="photo-card">
            <img src={src} alt={`${type} photo`} />
          </div>
        ))}
      </div>
    </div>
  );
}
