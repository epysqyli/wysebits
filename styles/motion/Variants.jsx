const BookUserInsightsVariant = (hook) => {
  if (hook) {
    return {
      animate: {
        y: ["100vh", "-5vh", "0vh"],
        scale: [0.9, 1.05, 1]
      },
      transition: {
        duration: 0.4,
        ease: "easeOut"
      },
      style: {
        top: "0%",
        left: "0%",
        height: "100vh",
        position: "fixed"
      }
    };
  } else {
    return {
      animate: {
        scale: [0.3, 1.1, 1]
      },
      transition: {
        duration: 0.3
      },
      style: {
        top: "50vh",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
        minHeight: "60vh",
        position: "fixed"
      }
    };
  }
};

export { BookUserInsightsVariant };
