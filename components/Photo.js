import React from "react";

const Photo = ({ item, title }) => {
  const height = item.metadata && item.metadata.height;
  const width = item.metadata && item.metadata.width;
  return (
    <>
      <div className="wrapper">
        <img className="element" src={item.url} alt={title} />
      </div>
      <style jsx>{`
        .wrapper {
          overflow: hidden;
          position: relative;
          padding-top: calc(${height} / ${width} * 100%);
          background-color: aliceblue;
        }
        .element {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Photo;
