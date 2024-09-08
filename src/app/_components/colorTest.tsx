// Import necessary React and Next.js functions
import { useState, useEffect } from "react";
import getDominantColors from "../_functions/getImageColor";

// Example React component
const DominantColors = ({ imageUrl }: { imageUrl: string }) => {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the dominant colors when the component is mounted
    getDominantColors(imageUrl, true).then(setColors).catch(console.error);
  }, [imageUrl]);

  return (
    <div>
      <h2>Dominant Colors:</h2>
      <div>
        {colors.map((color, index) => (
          <div key={index} style={{ backgroundColor: color, width: "100px", height: "100px" }}>
            {color}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DominantColors;