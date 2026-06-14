function ProgressBar({ percentage }) {

  return (

    <div
      style={{
        width: "100%",
        background: "#1f2937",
        borderRadius: "10px",
        overflow: "hidden",
        height: "20px",
      }}
    >

      <div
        style={{
          width: `${percentage}%`,
          background: "#22c55e",
          height: "100%",
          transition: "0.5s",
        }}
      ></div>

    </div>

  );

}

export default ProgressBar;