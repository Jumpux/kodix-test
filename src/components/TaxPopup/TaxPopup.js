import React from 'react';
import SumInYear from "../SumInYear";
import exit from '../../images/exit.svg';

import './style.css';

class TaxPopup extends React.Component {

    state = {
        enteredSalary: '',
        enteredSalaryError: false,
        enteredSalarySumError: false,
        sums: []
    };

    onHandleInput(salaryValue) {  // вносить в state данные input'a
        this.setState({enteredSalary: salaryValue.target.value})
    }

    salaryCalculation(event) {
        event.preventDefault();
        this.setState({sums: []}); // сброс предыдущих рассчетов
        if (this.state.enteredSalary.length >= 1 && this.state.enteredSalary <= 10000) { // если внесенна сумма менее 10 000р выводить ошибку
            this.setState({enteredSalaryError: false});  // если есть ошибка пустого инпута - убрать
            this.setState({enteredSalarySumError: true}); // добавить ошибку суммы
        }
        if (this.state.enteredSalary.length <= 0) { // если инпут пуст выводить ошибку
            this.setState({enteredSalaryError: true}); // добавить ошибку пустого инпута
        }
        else if (this.state.enteredSalary >= 10000) { // если условия соблюдены выводим данные
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
            });
            this.setState({enteredSalaryError: false}); // если условия соблюдены убираем ошибки
            this.setState({enteredSalarySumError: false}); // если условия соблюдены убираем ошибки
        }
    }

    render() {
        const {popupStatus, toggleTaxPopup} = this.props;

        return (
            <div className={popupStatus ? 'taxPopup popup-open' : 'taxPopup'}>
                <div>
                    <button className="taxPopup__close" onClick={() => {
                        toggleTaxPopup(!toggleTaxPopup); // изменяем родительский state для закрытия popup
                        this.setState({enteredSalaryError: false}); // обнуляем ошибки в случае закрытия popup окна
                        this.setState({enteredSalarySumError: false}); // обнуляем ошибки в случае закрытия popup окна
                    }}>
                        <img src={exit} alt="close popup"/>
                    </button>
                    <h2 className="taxPopup__title">Налоговый вычет</h2>
                    <p className="taxPopup__desc">
                        Используйте налоговый вычет чтобы погасить ипотеку досрочно.<br/>
                        Размер налогового вычета составляет не
                        более 13% от своего официального годового дохода.
                    </p>
                    <form className={this.state.enteredSalaryError ? 'taxPopup__salaryBlock input-error' : 'taxPopup__salaryBlock'} onSubmit={this.salaryCalculation.bind(this)}>
                        <label htmlFor="salaryMonth">Ваша зарплата в месяц</label>
                        <input type="text" id="salaryMonth" placeholder="Введите данные"
                               value={this.state.enteredSalary}
                               onChange={this.onHandleInput.bind(this)}
                        />
                        {this.state.enteredSalarySumError ? <span>Минимальная сумма заработной платы составляет 10 000 руб.</span> : <p/>}
                        {this.state.enteredSalaryError ? <p>Поле обязательно для заполнения</p> : <p/>}
                        <button>Рассчитать</button>
                    </form>
                    {this.state.enteredSalary.length <= 0 ? null : <SumInYear countOfYears={this.state.sums}/>}
                    <div className="taxPopup__whatReduce">
                        <p>Что уменьшаем?</p>
                        <div className="whatReduce__radio">
                            <input type="radio" name="whatReduce" id="payment" defaultChecked/>
                            <label htmlFor="payment" className="tag">Платеж</label>
                        </div>
                        <div className="whatReduce__radio">
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

export default TaxPopup;