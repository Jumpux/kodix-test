import React from 'react';
import SumInYear from "../SumInYear";
import exit from '../../images/exit.svg';

import './style.css'

export default class TaxPopup extends React.Component {

    state = {
        enteredSalary: '',
        sums: []
    };

    onHandleInput(salaryValue) {  // вносить в state данные input'a
        this.setState({enteredSalary: salaryValue.target.value})
    }

    salaryCalculation(event) {
        event.preventDefault();
        this.setState({sums: []}); // сброс предыдущих рассчетов
        if (this.state.enteredSalary > 1000) {
            let id = 0;
            const maxSum = 260000; // максимальная сумма выплаты
            const yearSum = (this.state.enteredSalary * 12) * 0.13; // просчет годовой максимальной суммы
            for (let i = yearSum; i <= maxSum; i = i + yearSum) { // добавление годовой суммы в массив
                this.setState(({sums}) => {
                    let allYearsSum = [...sums, {sum: yearSum, id: `totalSum__year-${id++}`, key: id }];
                    return {sums: allYearsSum}
                })
            }
            this.setState(({sums}) => { // добавление остатка от максимальной суммы в массив
                let balanceOfYears = [...sums, {sum: maxSum % yearSum, id: `totalSum__year-${id++}`, key: id}];
                return {sums: balanceOfYears}
            })
        }
    }

    render() {
        const {popupStatus, toggleTaxPopup} = this.props;

        return (
            <div className={popupStatus ? 'taxPopup popup-open' : 'taxPopup popup-close'}>
                <div>
                    <button className="taxPopup__close" onClick={() => {
                        toggleTaxPopup(!toggleTaxPopup)
                    }}>
                        <img src={exit} alt="close popup"/>
                    </button>
                    <h2 className="taxPopup__title">Налоговый вычет</h2>
                    <p className="taxPopup__desc">
                        Используйте налоговый вычет чтобы погасить ипотеку досрочно.<br/>
                        Размер налогового вычета составляет не
                        более 13% от своего официального годового дохода.
                    </p>
                    <form className="taxPopup__salaryBlock" onSubmit={this.salaryCalculation.bind(this)}>
                        <label htmlFor="salaryMonth">Ваша зарплата в месяц</label>
                        <input type="text" id="salaryMonth" placeholder="Введите данные"
                               value={this.state.enteredSalary}
                               onChange={this.onHandleInput.bind(this)}
                        />
                        <button>Рассчитать</button>
                    </form>
                    <SumInYear countOfYears={this.state.sums}/>
                    <div className="taxPopup__whatReduce">
                        <p>Что уменьшаем?</p>
                        <div className="whatReduce__checkbox">
                            <input type="radio" name="whatReduce" id="payment" defaultChecked/>
                            <label htmlFor="payment" className="tag">Платеж</label>
                        </div>
                        <div className="whatReduce__checkbox">
                            <input type="radio" name="whatReduce" id="date"/>
                            <label htmlFor="date" className="tag">Срок</label>
                        </div>
                    </div>
                </div>
                <button className="btn red-btn big-btn">Добавить</button>
            </div>
        )
    }

}