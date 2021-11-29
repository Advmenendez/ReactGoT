import React, { useState, useEffect } from "react";
import getGots from "../../api/fetch_gots";
import "./GotList.css";

const GotList = () => {
  useEffect(() => {
    formatGots();
  }, []);

  const [gots, setGots] = useState([]);

  const formatGots = async () => {
    const gotdb = await getGots();
    setGots(gotdb.data.gots);
  };

  return (
    <div className="gots">
      <ul className="got__container">
        {gots.map((got) => {
          return (
            <li className="got__item" key={JSON.stringify(got)} >
              
                <h3 className="got__name">{got.name}</h3>
                <h3 className="got__caption">Lider: {got.leader}</h3>
                <h3 className="got__caption">Lema: {got.motto}</h3>
                <img className="got__img" src={got.img} alt={got.name} />

            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GotList;
