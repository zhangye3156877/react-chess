import React from 'react';
import './style.scss';

function GameItem(props) {
  //切换改变高度
  // const handleMouseEnter = function(e) {
  //   console.log(e.target.width);
  //   e.target.width = 800
  // }
  return (
    <div 
      onClick={props.setID}
      onMouseEnter = {props.setChoosed}
    >
      {
        // props.choosed ?
        // <img src={props.choosedImgUrl} style= {props.style} 
        // className="game-item" alt=""/> : 
        <img src={props.imgUrl} style= {props.style}  
        className={props.choosed ? "game-item actived" : "game-item"} alt=""/>
      }
    </div>
  ) 
}
export default GameItem;