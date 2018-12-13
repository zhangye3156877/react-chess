import React, { PureComponent } from 'react';
import Konva from 'konva';
import {Layer, Line ,Circle} from 'react-konva';

class WaringForChess extends PureComponent {
  componentDidMount = () => {
    
    this.circle.to({
      radius:15,
      duration: 1,
      easing: Konva.Easings.Linear
    });
  }
  
  render() {
    let [x,y] = this.props.axisForWarn;
    return (
      <Layer>
        <Line
          key="WaringForChess-line"
          points={[
            x - 1000, y,
            x + 1000, y, 
            x, y, 
            x, y + 1000,
            x, y - 1000
          ]}
          stroke = "red"
        />
        <Circle
          key="WaringForChess-circle"
          ref={node => {
            this.circle = node;
          }}
          x={x} 
          y={y}
          radius={400} 
          stroke="red"
          strokeWidth="2"
        />
      </Layer>
    );
  }
}

export default WaringForChess;