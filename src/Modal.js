import { useState } from 'react';

function Modal({ showModal, setShowModal, buildings, setBuildings }) {
  const [buildingName, setBuildingName] = useState('');
  const [floors, setFloors] = useState(['1F']);

  const [newFloor, setNewFloor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [locations, setLocations] = useState([]);

  const addFloor = () => {
    const newFloor = `${floors.length + 1}F`;
    setFloors([...floors, newFloor]);
    setNewFloor('');
  };
  

  const addLocation = () => {
    setLocations([...locations, newLocation]);
    setNewLocation('');
  };

  const onSubmit = () => {
    const newBuilding = {
      id: buildings.length + 1,
      name: buildingName,
      places: locations,
    };
    setBuildings([...buildings, newBuilding]);
    setShowModal(false);
  };
  

  return (
    <div className={showModal ? 'modal display-block' : 'modal display-none'}>
      <div className="modal-main">
        <div className="modal-header">
          <h2>건물 등록</h2>
        </div>
        <div className="modal-content">
          <label>건물명</label>
          <input
            type="text"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
          />
          <div>
          <label>층</label>
          <div className="floors">
            {floors.map((floor, index) => (
              <div key={index} className="floor">
                {floor}
                <button onClick={() => setFloors(floors.filter((f, i) => i !== index))}>
                  x
                </button>
              </div>
            ))}
          </div>
          <div className="add-floor">
            <button onClick={addFloor}>+추가</button>
          </div>
          
          </div>

          <label>세부장소명</label>
          {locations.map((location, index) => (
            <div key={index} className="location">
              <input type="text" value={location} onChange={(e) => {
                  let newLocations = [...locations];
                  newLocations[index] = e.target.value;
                  setLocations(newLocations);
                }} />
              <button onClick={() => {
                  let newLocations = [...locations];
                  newLocations.splice(index, 1);
                  setLocations(newLocations);
                }}>x</button>
            </div>
          ))}
          <div className="add-location">
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') addLocation();
              }}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={() => setShowModal(false)}>취소</button>
          <button onClick={onSubmit}>등록하기</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;