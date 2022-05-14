const BookUserInsightsVariant = (hook) => {
  if (hook) {
    return {
      animate: {
        scale: [0.7, 1.05, 1],
      },
      transition: {
        duration: 0.3,
      },
      style: {
        top: "0%",
        left: "0%",
        maxHeight: "100vh",
        position: "fixed",
      },
    };
  } else {
    return {
      animate: {
        scale: [0.7, 1.05, 1],
      },
      transition: {
        duration: 0.3,
      },
      style: {
        top: "50vh",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
        minHeight: "60vh",
        position: "absolute",
      },
    };
  }
};

export { BookUserInsightsVariant };
