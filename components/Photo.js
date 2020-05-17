import { useState } from "react";
import Lightbox from "react-image-lightbox";

const Photo = ({ item, title, big_url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const height = item.metadata && item.metadata.height;
  const width = item.metadata && item.metadata.width;
  return (
    <>
      <div className="wrapper">
        <img
          onClick={() => setIsOpen(true)}
          className="element"
          src={item.url}
          alt={title}
        />
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={big_url}
          nextSrc={undefined}
          prevSrc={undefined}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => null}
          onMoveNextRequest={() => null}
        />
      )}
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
