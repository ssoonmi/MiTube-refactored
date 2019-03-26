import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme_context';

const SubmitFileContainer = styled.div.attrs(({ theme }) => ({
  color: theme.color,
  blue: theme.blue
}))`
  cursor: pointer; 
  margin-bottom: 16px;

  &.disabled {
    opacity: 0.3;

    label {
      cursor: auto;
    }
  }

  label {
    cursor: pointer; 
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 3px;
    border: 1px solid gray;
    padding: 36px 16px;

    h4 {
      font-size: 1.4rem;
      color: ${props => props.blue}
      margin-bottom: 4px;
    }

    h5 {
      font-size: 1.2rem;
      margin-bottom: 4px;
      color: ${props => props.color};
    }

    span {
      font-size: 1rem;
      color: ${props => props.color};
    }

    .upload-icon {
      font-size: 60px;
      margin-bottom: 8px;
    }

    .instructions {

    }
  }
  input {
    display: none;
  }
`;

function SubmitFile({ file, setFile, acceptedTypes, label, disabled }) {
  const theme = useContext(ThemeContext);
  const [dragHighlight, setDragHighlight] = useState(false);
  const [hoverHighlight, setHoverHighlight] = useState(false);

  function highlightDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setDragHighlight(true);
  }

  function unhighlightDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setDragHighlight(false);
  }

  function highlightHover(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setHoverHighlight(true);
  }

  function unhighlightHover(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setHoverHighlight(false);
  }

  function onChange(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.files[0]) {
      setFile(e.currentTarget.files[0]);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      unhighlightDrag(e);
      setFile(e.dataTransfer.files[0]);
    }
  }

  let iconColor = {};
  if (hoverHighlight) iconColor = { color: "red" };
  if (dragHighlight) iconColor = { color: "green" };

  return (
    <SubmitFileContainer className={disabled ? "disabled" : ""} theme={theme}>
      <label
        onDragEnter={highlightDrag}
        onDragLeave={unhighlightDrag}
        onDragOver={highlightDrag}
        onDrop={onDrop}
        onMouseEnter={highlightHover}
        onMouseLeave={unhighlightHover}
      >
        {file ?
          (
            <>
              <h4>{file.name}</h4>
              <span
                style={hoverHighlight ? { color: "red" } : {}}>
                Click to change {label} file
              </span>
            </>
          ) :
          (
            <>
              <div 
                className="upload-icon"
                style={iconColor}>
                <i className="fas fa-upload"></i>
              </div>
              <h5
                style={hoverHighlight ? { color: "red" } : {}}>
                Select {label} file to upload
              </h5>
              <span
                style={dragHighlight ? { color: "green" } : {}}>
                Or drag and drop {label} file
              </span>
            </>
          )
        }
        <input
          onChange={onChange}
          type="file"
          accept={acceptedTypes}
          disabled={disabled} />
      </label>
    </SubmitFileContainer>
  );
}

export default SubmitFile;