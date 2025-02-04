import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="h-1/3 w-2/4 absolute right-0 top-32 p-2">
      <h2 className="text-4xl font-light">Avec</h2>
      <h3 className="text-6xl font-black my-5 text-orange-400">GROOVE</h3>
      <p className="text-4xl font-light">
        Découvrez et redécouvrez les plus grands <br />
        hits de ces dernières années.
      </p>
    </div>
  );
};

export default Hero;
