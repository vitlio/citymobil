import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import "./table.css";

const Table = () => {
  let [titles, setTitles] = useState();
  let [table, setTable] = useState();
  let [searchline, setSearchline] = useState("");
  let [sortArrow, setSortArrow] = useState(true);
  let [chosenAuto, setChosenAuto] = useState([false, ""]);
  useEffect(() => {
    fetch("https://city-mobil.ru/api/cars")
      .then((data) => data.json())
      .then((arr) => {
        arr.tariffs_list.unshift("Марка и модель");
        setTitles(arr.tariffs_list);
        setTable(arr.cars);
        setSearchline(arr.cars);
      });
  }, []);

  function searchSubstring(str) {
    if (str) {
      setTable(
        searchline.filter(
          (i) =>
            i.mark.toLowerCase().indexOf(str.toLowerCase()) !== -1 ||
            i.model.toLowerCase().indexOf(str.toLowerCase()) !== -1
        )
      );
    } else {
      setTable(searchline);
    }
  }
  function clickHandler(e) {
    let target = e.target;
    target.classList.contains("sort-arrow-toggle")
      ? target.classList.remove("sort-arrow-toggle")
      : target.classList.add("sort-arrow-toggle");
    sortArrow
      ? table.sort((a, b) => {
          if (a.mark + a.model > b.mark + b.model) return -1;
          if (a.mark + a.model < b.mark + b.model) return 1;
          return 0;
        })
      : table.sort((a, b) => {
          if (a.mark + a.model < b.mark + b.model) return -1;
          if (a.mark + a.model > b.mark + b.model) return 1;
          return 0;
        });
    setSortArrow(!sortArrow);
    setTable(table);
  }
  function chooseHandler({ mark, model, year }) {
    setChosenAuto([
      true,
      `Выбран автомобиль ${mark} ${model} ${year} года выпуска`,
    ]);
  }
  return (
    <div className="table-main">
      <div className="table-search">
        <Search searchSubstring={searchSubstring} />

        <div className="table-titles">
          {titles &&
            titles.map((i, idx) => {
              if (i === "Марка и модель") {
                return (
                  <div key={idx} className="title-name">
                    {i}
                    <img
                      onClick={(e) => clickHandler(e)}
                      className="sort-arrow"
                      src="http://localhost:3000/img/vector.svg"
                      alt="sort"
                    />
                  </div>
                );
              }
              return (
                <div key={idx} className="title-name">
                  {i}
                </div>
              );
            })}
        </div>

        {table &&
          table.map((i, idx) => {
            let { mark, model, tariffs } = i;
            return (
              <div key={JSON.stringify(i)} className="table-cars">
                {titles.map((j, index) => {
                  if (j === "Марка и модель") {
                    return (
                      <div key={index} className="cars">
                        {mark + " " + model}
                      </div>
                    );
                  }
                  if (tariffs.hasOwnProperty(j)) {
                    let year = tariffs[j].year;
                    return (
                      <div
                        key={index}
                        className="cars chose"
                        onClick={() => chooseHandler({ mark, model, year })}
                      >
                        {tariffs[j].year}
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="cars">
                      -
                    </div>
                  );
                })}
              </div>
            );
          })}
        {chosenAuto[0] && <div className="chosen-car">{chosenAuto[1]}</div>}
      </div>
    </div>
  );
};

export default Table;
