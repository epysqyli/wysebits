const FullScreenLoader = () => {
  return (
    <div className="fixed w-full h-screen z-50 bg-gray-800 bg-opacity-25">
      <div class="lds-ellipsis mx-auto scale-150 mt-60">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
