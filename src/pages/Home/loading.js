import React from 'react';

import styled from 'styled-components';

const LoadingBox = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: -100px;
  left: 0;
`;

class Loading extends React.Component {
  render() {
    return (
      <LoadingBox>
        <div className="pt-spinner pt-large">
          <div className="pt-spinner-svg-container">
            <svg viewBox="0 0 100 100">
              <path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
              <path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
            </svg>
          </div>
        </div>
      </LoadingBox>
    )

  }
}

export default Loading;
