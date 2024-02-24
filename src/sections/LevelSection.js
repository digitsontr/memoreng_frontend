import { useState } from "react";
import "../css/Section.css";
function LevelSection() {
  return (
    <div className="level-section">
      <div className="level-section-row d-flex align-items-stretch border">
        <div className="flex-grow-1 h-100 align-items-center justify-content-center border">
          <div className="level-item a1 h-100 d-flex align-items-center justify-content-center ">
            A1
          </div>
        </div>
        <div className="flex-grow-1 h-100 align-items-center border">
          <div className="level-item a2 h-100 d-flex align-items-center justify-content-center ">
            A2
          </div>
        </div>
        <div className="flex-grow-1 h-100 align-items-center text-align-center border">
          <div className="level-item b1 h-100 d-flex align-items-center justify-content-center">
            B1
          </div>
        </div>
      </div>
      <div className="level-section-row d-flex align-items-center border">
        <div className="flex-grow-1 h-100 align-items-center justify-content-center border">
          <div className="level-item b2 h-100 d-flex align-items-center justify-content-center">
            B2
          </div>
        </div>
        <div className="flex-grow-1 h-100 align-items-center border">
          <div className="level-item c1 h-100 d-flex align-items-center justify-content-center">
            C1
          </div>
        </div>
        <div className="flex-grow-1 h-100 align-items-center border">
          <div className="level-item c2 h-100 d-flex align-items-center justify-content-center">
            C2
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelSection;
