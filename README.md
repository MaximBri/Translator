<h1>Плагин переводчик</h1>

Стек:
 - React
 - React Router v6
 - TypeScript
 - Redux Toolkit
 - Shadcn UI
 - Vite
 - FSD

Реализовано приложение, на странице которого располагается текст с возможностью смены языка для него. При выделении текста появляется tooltip поверх контента на странице, внутри которого отображается перевод выделенного текста. В tooltip присутствует возможность выбора, с какого языка и на какой язык осуществляется перевод.<br>

Перевод текста осуществлен с помощью LibreTranslate API: https://github.com/LibreTranslate/LibreTranslate?tab=readme-ov-file.<br>

Реализация tooltip осуществлена с помощью библиотеки react-draggable: https://www.npmjs.com/package/react-draggable. При реализации учтено, что выделение может произойти в любой части экрана, tooltip не выходит за его пределы.<br>

Реализация озвучивания текста осуществлена с помощью библиотеки react-text-to-speech: https://www.npmjs.com/package/react-text-to-speech.<br>

Использован менеджер состояния Redux Toolkit для работы с языками.<br>

Для стилизации использована библиотека компонентов Shadcn UI: https://ui.shadcn.com/.<br>

В ходе реализации приложения решены следующие задачи:
 1. Создан tooltip, появляющийся при выделении текста (Алексей Ушаков, Максим Брызгалов).
 2. Реализована возможность озвучивания текста (Алексей Ушаков).
 3. Реализовано сохранение истории переводов (Айдар Арзыбеков).
 4. Реализована возможность копирования вставленного текста и переведенного (Максим Брызгалов).
 5. Реализовано автоопределение языка для выделенного текста (Айдар Арзыбеков).
 6. Реализована конвертация приложения в расширение (Максим Брызгалов).
 7. Добавлены настройки для приложения (Максим Брызгалов).
