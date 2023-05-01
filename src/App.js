import React, { useState } from 'react';
import Modal from './Modal';

function App() {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuildings, setSelectedBuildings] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleBuildingDelete = () => {
    setBuildings(buildings.filter((building) => !selectedBuildings.includes(building)));
    setSelectedBuildings([]);
  };

  const handleBuildingSelect = (event, building) => {
    if (event.target.checked) {
      setSelectedBuildings([...selectedBuildings, building]);
    } else {
      setSelectedBuildings(selectedBuildings.filter((selected) => selected !== building));
    }
  };

  const handleBuildingAdd = () => {
    setShowModal(true);
  };

  const handleBuildingSubmit = (newBuilding) => {
    setBuildings([...buildings, newBuilding]);
    setShowModal(false);
  };

  return (
    <div>
      <h2>장소검색</h2>
      <div>
        <select>
          <option value="건물명">건물명</option>
          <option value="세부장소명">세부장소명</option>
        </select>
        <input type="text" placeholder="검색어를 입력하세요" />
        <button>검색</button>
        <button onClick={handleBuildingAdd}>건물등록</button>
        <button onClick={handleBuildingDelete}>건물삭제</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>건물명</th>
            <th>세부장소</th>
          </tr>
        </thead>
        <tbody>
          {buildings.map((building, index) => (
            <tr key={building.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedBuildings.includes(building)}
                  onChange={(event) => handleBuildingSelect(event, building)}
                />
                {index + 1}
              </td>
              <td>{building.name}</td>
              <td>{building.places.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} handleBuildingSubmit={handleBuildingSubmit} buildings={buildings} setBuildings={setBuildings} />}
    </div>
  );
}

export default App;