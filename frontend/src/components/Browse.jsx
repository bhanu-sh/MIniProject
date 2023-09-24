import React, { useEffect, useState } from "react";
import laptopList from "./dummydata";

const Browse = () => {
  const [laptopData, setLaptopData] = useState(laptopList);

  const brands = ["Sofa", "Bed", "Table", "Chair"];

  const [selOptions, setSelOptions] = useState([]);

  const displayData = () => {
    return laptopData.map((laptop) => (
      <div className="col-md-3 py-2">
        <div className="card">
          <img className="card-img-top" src={laptop.image} alt="" />
          <div className="card-body">
            <h4>{laptop.brand}</h4>
            <h3>{laptop.model}</h3>
            <h2>&#8377; {laptop.price}</h2>
          </div>
        </div>
      </div>
    ));
  };

  const searchLaptop = (e) => {
    const search = e.target.value;
    const result = laptopList.filter((laptop) => {
      return laptop.model.toLowerCase().includes(search.toLowerCase());
    });
    setLaptopData(result);
  };

  const filterBrand = (e) => {
    if (e.target.value === "") return setLaptopData(laptopList);
    const selBrand = e.target.value;
    const result = laptopList.filter((laptop) => {
      return laptop.brand === selBrand;
    });
    setLaptopData(result);
  };

  const selectOption = (brand) => {
    if(selOptions.includes(brand)) {
        setSelOptions(selOptions.filter((b) => b !== brand));
    }else{
        setSelOptions([...selOptions, brand]);
    }
  }

  useEffect(() => {
    if(selOptions.length === 0) return setLaptopData(laptopList);
    setLaptopData(laptopList.filter((laptop) => {
        return selOptions.includes(laptop.brand);
    }))
  }, [ selOptions ])

  return (
    <div>
      <header className="bg-dark text-white">
        <div className="container py-5">
          <h1 className="text-center">Browse Furnitures</h1>
          <hr />
          <input type="text" className="form-control" onChange={searchLaptop} />

          <div className="row mt-4">
            <div className="col-md-5">
              <select className="form-control w-25 mt-4" onChange={filterBrand}>
                <option value="">Furniture Type</option>
                {brands.map((b) => (
                  <option value={b}>{b}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4 my-auto">
                <input checked={(selOptions.includes('Sofa'))} onClick={() => {selectOption('Sofa')}} className="form-check-input" type="checkbox" /> Sofa&nbsp;&nbsp;&nbsp;
                <input checked={(selOptions.includes('Bed'))} onClick={() => {selectOption('Bed')}} className="form-check-input" type="checkbox" /> Bed&nbsp;&nbsp;&nbsp;
                <input checked={(selOptions.includes('Table'))} onClick={() => {selectOption('Table')}} className="form-check-input" type="checkbox" /> Table&nbsp;&nbsp;&nbsp;
                <input checked={(selOptions.includes('Chair'))} onClick={() => {selectOption('Chair')}} className="form-check-input" type="checkbox" /> Chair&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row">{displayData()}</div>
      </div>
    </div>
  );
};

export default Browse;
