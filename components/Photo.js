import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

const Photo = ({ item, title, big_url }) => {
  const height = item.metadata && item.metadata.height;
  const width = item.metadata && item.metadata.width;
  return (
    <>
      <div className="wrapper">
        <SimpleReactLightbox>
          <SRLWrapper
            options={{
              buttons: {
                showNextButton: false,
                showPrevButton: false,
                showFullscreenButton: false,
                showDownloadButton: false,
                showAutoplayButton: false,
              },
              thumbnails: {
                showThumbnails: false,
              },
            }}
          >
            <a href={big_url} data-attribute="SRL">
              <img className="element" src={item.url} alt={title} />
            </a>
          </SRLWrapper>
        </SimpleReactLightbox>
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
