

//Выполняем действия после загрузки структуры страницы (DOMContentLoaded)
window.addEventListener("DOMContentLoaded", function () {
    'use strict';

    //----------------------------------
    //Реализация табов.
    //----------------------------------

    let tab = document.querySelectorAll(".info-header-tab"), // Получаем все табы-кнопки
        info = document.querySelector(".info-header"), //Получаем родителя с табами-кнопками
        tabContent = document.querySelectorAll(".info-tabcontent"); //Получаем весь таб-контент



// Цикл, который проходит по табам с индексом от 1 до 4 и меняет классы.
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }
    hideTabContent(1); // Передаем 1, чтоб таб с индексом 0 отображался на странице

    // Передаем индекс таба, чтоб сменить класс
    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener("click", function (event) {
        let target = event.target;
        if (target && target.classList.contains("info-header-tab")) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0); // Скрываем 0 таб, который отображается по умолчанию
                    showTabContent(i); //Отображаем таб
                    break;
                }
            }
        }
    });

    //----------------------------------
    // Реализация таймера
    //----------------------------------
    let deadline = "2024-07-23";

    // Получаем оставшееся время и записываем данные в функцию
    function  getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),  //Дата дедлайна - текущая дата
            seconds = Math.floor((t/1000) % 60),  //Math.floor - округление, t/1000 % 60 - получение секунд
            minutes = Math.floor((t/1000/60) % 60), // - Получение минут
            hours = Math.floor((t/(1000*60*60)) % 60), //  - Получение часов
            days = Math.floor(((t/1000/60/60) % 24)); // - получение дней

            return {
              "total" : t,
              "hours" : hours,
              "minutes" : minutes,
              "seconds" : seconds
            };
    }

    //Получаем элементы на странице и запускаем функцию каждые 1000мс
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000)

        //Получаем данные из функции и обновляем информация на сайте
        function updateClock() {
            let t = getTimeRemaining(endtime);

            //Добавление 0 перед цифрой. Формат 00:00:00
            if (t.seconds < 10) {
                seconds.textContent = "0" + t.seconds;
            }
            else {
                seconds.textContent = t.seconds;
            }
            if (t.minutes < 10) {
                minutes.textContent = "0" + t.minutes;
            }
            else {
                minutes.textContent = t.minutes;
            }
            if (t.hours < 10) {
                hours.textContent = "0" + t.hours;
            }
            else {
                hours.textContent = t.hours;
            }
            // hours.textContent = "0" + t.hours;
            // minutes.textContent = "0" +t.minutes;
            // seconds.textContent = "0" +t.seconds;


            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock("timer", deadline)

    //----------------------------------
    // Реализация модального окна (Modal)
    //----------------------------------
    let more = document.querySelector(".more"),   //Кнопка вызова модального окна
        overlay = document.querySelector(".overlay"), //Форма модального окна
        close = document.querySelector(".popup-close"); // Кнопка "X" закрытия модального окна

    //Вызываем модальное окно
    more.addEventListener("click", function (event) {
        overlay.style.display = "block";
        this.classList.add("more-splash"); //Анимация кнопки
        document.body.style.overflow = "hidden"; //Запрещаем прокрутку страницы
    });
    //Закрываем модальное окно
    close.addEventListener("click", function () {
        overlay.style.display = "none";
        more.classList.remove("more-splash"); //Анимация кнопки
        document.body.style.overflow = ""; //Снимаем ограничение на прокрутку страницы
    })
});

