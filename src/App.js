import React, { useState } from 'react';
import Modal from './Modal';

function App() {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuildings, setSelectedBuildings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('건물명'); // 추가

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

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  }; // 추가

  const filteredBuildings = buildings.filter((building) => {
    const name = building.name.toLowerCase();
    const search = searchText.toLowerCase();
    if (searchType === '건물명') {
      return name.includes(search);
    } else if (searchType === '세부장소명') {
      return building.places.some((place) => place.toLowerCase().includes(search));
    }
  });

  return (
    <div>
      <h2>장소검색</h2>
      <div>
        <select value={searchType} onChange={handleSearchTypeChange}>
          <option value="건물명">건물명</option>
          <option value="세부장소명">세부장소명</option>
        </select>
        <input type="text" placeholder="검색어를 입력하세요" value={searchText} onChange={handleSearchTextChange} />
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
          {filteredBuildings.map((building, index) => (
            <tr key={building.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedBuildings.includes(building)}
                  onChange={(event) => handleBuildingSelect(event, building)}
                />
                {index +1}
              </td>
              <td>{building.name}</td>
              <td>{building.places.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    {showModal && <Modal onSubmit={handleBuildingSubmit} onCancel={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
