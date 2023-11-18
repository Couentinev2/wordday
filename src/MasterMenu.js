import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Picker } from '@react-native-picker/picker';

function MasterMenu({ interfaceLanguage, handleInterfaceLanguageChange, definitionLanguage, handleDefinitionLanguageChange, level, handleLevelChange }) {
  const navigate = useNavigate();

  return (
<div className="menu-container">
  <input type="checkbox" id="menu-toggle" className="menu-toggle"/>
  <label htmlFor="menu-toggle" className="menu-button">Menu</label>

  <div className="menu-content">
      <button onClick={() => navigate('/previous-words')}>
        View Previous Words
      </button>

      <div>
        <label>Learning Language:</label>
        <Picker
          selectedValue={interfaceLanguage}
          onValueChange={handleInterfaceLanguageChange}
        >
          <Picker.Item label="English" value="english" />
          <Picker.Item label="French" value="french" />
          <Picker.Item label="Korean" value="korean" />
        </Picker>
      </div>

      <div>
        <label>Definition Language:</label>
        <Picker
          selectedValue={definitionLanguage}
          onValueChange={handleDefinitionLanguageChange}
        >
          <Picker.Item label="English" value="english" />
          <Picker.Item label="French" value="french" />
          <Picker.Item label="Korean" value="korean" />
        </Picker>
      </div>

      <div>
        <label>Level:</label>
        <Picker
          selectedValue={level}
          onValueChange={handleLevelChange}
        >
          <Picker.Item label="Beginner" value="beginner" />
          <Picker.Item label="Intermediate" value="intermediate" />
          <Picker.Item label="Advanced" value="advanced" />
        </Picker>
      </div>
  </div>
</div>
  );
}

export default MasterMenu;
