import { Toolbar } from "@mui/material";

export default function InputBar() {
  return (
    <div className="inputBar">
      <Toolbar className="toolBar" />
      <div className="queries">
        <div className="textField">
          <div className="input">
            <div className="content">
              <div className="startContainer"></div>
              <div className="labelDiv">
                <p className="label">神に話しかけてみる</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
