import React, { useState } from 'react';

function Modal(props) {
  const [name, setName] = useState('');
  const [places, setPlaces] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePlaceChange = (event, index) => {
    const newPlaces = [...places];
    newPlaces[index] = event.target.value;
    setPlaces(newPlaces);
  };

  const handleAddPlace = () => {
    setPlaces([...places, '']);
  };

  const handleRemovePlace = (index) => {
    const newPlaces = [...places];
    newPlaces.splice(index, 1);
    setPlaces(newPlaces);
  };

  const handleSubmit = () => {
    const newBuilding = {
      id: Date.now(),
      name: name,
      places: places.filter((place) => place !== ''),
    };
    props.onSubmit(newBuilding);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => props.onCancel()}>
          
        </span>
        <h2>건물 등록</h2>
        <div>
          <label>건물명:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>세부장소:</label>
          {places.map((place, index) => (
            <div key={index}>
              <input type="text" value={place} onChange={(event) => handlePlaceChange(event, index)} />
              <button onClick={() => handleRemovePlace(index)}>삭제</button>
            </div>
          ))}
          <button onClick={handleAddPlace}>추가</button>
        </div>
        <div>
          <button onClick={handleSubmit}>등록</button>
          <button onClick={() => props.onCancel()}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
