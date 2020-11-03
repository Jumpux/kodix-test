import React from "react";

import './style.css';

const SumInYear = ({countOfYears}) => {
    return (
        <div className="taxPopup__totalSum">
            <p className={countOfYears.length > 0 ? 'totalSum__desc show' : 'totalSum__desc'}>Итого можете внести в качестве досрочных:</p>
            {countOfYears.map((it) => {
                return <div className="totalSum__checkbox" key={it.key}>
                    <input type="checkbox" id={it.id}/>
                    <label htmlFor={it.id}>
                        <span>{it.sum} рублей </span>в {it.key} год
                    </label>
                </div>
            })}
        </div>
    )
};

export default SumInYear;