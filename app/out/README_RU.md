<div align="center"><ins>

[English](/app/out/README.md)

</ins></div>

Расширение предназначено для написания...расширения без...расширения 🤔 Хм. Если коротко, расширение дает возможность писать JavaScript код **(скрипты)**, у которого будет доступ к контексту выполнения VS Code. Далее три небольших примера:

>---
>**ПРИМЕЧАНИЕ**
>
>После установки расширения, в статус-баре, слева, появится его иконка, клик на которую будет запускать/останавливать скрипты.
>
>![01](https://user-images.githubusercontent.com/5076458/122537531-52228880-d02e-11eb-9025-11fea068124d.jpg)
>
>---

# Пример 1. Традиционный **'Hello Context'**.

*Шаг 1.* В папке **.vscode**, в файл **setting.json** (если еще нет таких — создаем), пропишем настройки для скрипта:

```json
{
    "contextScripts": [
        {
            "name": "Hello Context",
            "path": "./ctx-scripts/HelloContext.js"
        }
    ]
}
```

где:

- *name* - произвольное имя скрипта.
- *path* - путь, по которому он будет находиться.

*Шаг 2.* По пути *path*, разместим файл **HelloContext.js** со следующим содержимым:

```js
// Importing the "vscode" module, which contains the VS Code extensibility API
const vscode = require("vscode");

// ACTIVATION FUNCTION THAT IS TRIGGERED WHEN THE SCRIPT IS RUN
function activate() {

    // An additional function for using message output, as well as displaying error messages in the script
    ctxLog("Hello from the context to the output window!👋😎");

    // Displays the message in VS Code pop-up messages
    vscode.window.showInformationMessage("Hello from the context to pop-up messages!👋😎")

}

// Export the activation function to be called by extension
module.exports = { activate }
```

На этом все. Теперь кликом по иконке расширения в статус-баре, должен отображается следующий результат:

![02](https://user-images.githubusercontent.com/5076458/122542612-91070d00-d033-11eb-91da-3eb9b3f72c89.gif)

# Пример 2. **'Clock'**.

Демонстрация доступа к статус бару.

>---
>**ВНИМАНИЕ**
>
>Как бы то ни было, все же это не полноценные расширения VS Code, поэтому не вся функциональность будет доступна. В частности та, которая настраивается через файл манифест package.json (к примеру, отображение команд в командной панели (Ctrl+Shift+P)).
>
>---

Шаги остаются те же (на GitHub, в [репозитории данного расширения](https://github.com/IPcorps/VSCContextScript), можно посмотреть как [файл настроек](https://github.com/IPcorps/VSCContextScript/blob/main/.vscode/settings.json), так и [примеры скриптов](https://github.com/IPcorps/VSCContextScript/tree/main/ctx-scripts)). Клик по иконке останавливает/запускает отображение текущего времени:

![03](https://user-images.githubusercontent.com/5076458/122543631-a466a800-d034-11eb-99c9-71ff7c111b9a.gif)

# Пример 3. **'Server'**.

Пожалуй, этот пример полезен сам по себе. Отдавая команды (передавая данные) как параметры запущенному скриптом серверу, появляется возможность "непрямого" управления VS Code в режиме реального времени. К примеру, довольно удобно со скриптов сборки проекта, либо менеджера задач (gulp и т.д.). В данном случае, не усложняя, запускаем, рестартуем, и останавливаем отладчик VS Code простыми GET запросами через адресную строку браузера.

Запуск сервера:

![041](https://user-images.githubusercontent.com/5076458/122554661-f4983700-d041-11eb-9ede-d304ab1a39f6.gif)

Запуск отладки:

![042](https://user-images.githubusercontent.com/5076458/122554699-011c8f80-d042-11eb-9aa0-485cad05ae07.gif)

Рестарт:

![043](https://user-images.githubusercontent.com/5076458/122554865-2d381080-d042-11eb-988d-6646580cb944.gif)

Завершаем отладку и останавливаем сервер:

![044](https://user-images.githubusercontent.com/5076458/122555000-5eb0dc00-d042-11eb-8263-8111f000a104.gif)

Есть возможность многие команды получить из самой VS Code:

![51](https://user-images.githubusercontent.com/5076458/122555232-b2bbc080-d042-11eb-9a05-fe431fcc85f3.jpg)

![52](https://user-images.githubusercontent.com/5076458/122555237-b3eced80-d042-11eb-83d2-6ac8daf706c3.jpg)

# Работа расширения.

Расширение считывает свойство массив **contextScripts** из файла настроек **settings.json**, каждый элемент которого является **объектом метаданных отдельно взятого скрипта**. Затем, используя их **path**, подключает все скрипты как модули, тем самым давай им доступ к контексту выполнения среды. Каждый объект метаданных имеет следующие свойства:

- *name* - (требуется) имя скрипта (выводится в логе ошибок).
- *path* - (требуется) путь, по которому расположен скрипт.
- *parameters* - (необязательно) объект с данными, который будет передан скрипту как параметр.

В файле скрипта расширению важны две функции (не возвращающие результат):

- *activate(params) {}* - (требуется) вызывается при запуске скрипта, с необязательным параметром, который принимает объект передаваемых данных скрипту **parameters** из файла настроек.
- *deactivate() {}* - (необязательно) вызывается при выключении скриптов. 

Так же, для целей отладки, в глобальной области видимости доступна функция расширения **ctxLog()**, которая принимает два аргумента:

- *строка (string)* - (требуется) выводится в канал вывода расширения VSContext.
- *флаг (boolean)* (необязательный) - при true каждый вывод будет с новой строки (по умолчанию), при false - без перевода строк.

# Полезные ссылки.

[Основной ресурс по написанию расширений VS Code](https://code.visualstudio.com/api). И там, среди прочего:

- [VS Code API]() - Полное API среды разработки.
- [Built-in Commands](https://code.visualstudio.com/api/references/commands) - еще небольшой перечень команд, доступных к выполнению методом **vscode.commands.executeCommand**.
