<div align="center"><ins>

[Русский](/app/out/README_RU.md)

</ins></div>

The extension is intended for writing...extensions without...extensions 🤔 Hm. In short, the extension allows you to write JavaScript code **(scripts)**, which will have access to the VS Code execution context. Below are three small examples:

>---
>**NOTE**
>
>After installing the extension, its icon will appear in the status bar on the left, clicking on which will start/stop the written scripts.
>
>![01](https://user-images.githubusercontent.com/5076458/122537531-52228880-d02e-11eb-9025-11fea068124d.jpg)
>
>---

# Example 1. Traditional **'Hello Context'**.

*Step 1.* In the **folder.vscode**, in the file **setting.json** (if there are no such ones yet, you need to create them), we will write the settings for the script:

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

where:

- *name* - an arbitrary script name.
- *path* - the path where it will be located.

*Step 2.* On the path *path*, place the file **HelloContext.js** with the following content:

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

That's all. Now, by clicking on the extension icon in the status bar, the following result should be displayed:

![02](https://user-images.githubusercontent.com/5076458/122542612-91070d00-d033-11eb-91da-3eb9b3f72c89.gif)

# Example 2. **'Clock'**.

Demonstration of access to the status bar.

>---
>**ATTENTION**
>
>However, these are not full-fledged VS Code extensions, so not all the functionality will be available. In particular, the one that is configured via the manifest file package .json (for example, displaying commands in the command panel (Ctrl+Shift+P)).
>
>---

The steps remain the same (on GitHub, in the [repository of this extension](https://github.com/IPcorps/VSCContextScript), can be viewed as [settings file](https://github.com/IPcorps/VSCContextScript/blob/main/.vscode/settings.json), and [scripts examples](https://github.com/IPcorps/VSCContextScript/tree/main/ctx-scripts)). Clicking on the icon stops/starts displaying the current time:

![03](https://user-images.githubusercontent.com/5076458/122543631-a466a800-d034-11eb-99c9-71ff7c111b9a.gif)

# Example 3. **'Server'**.

Perhaps this example is useful in itself. Giving commands (transmitting data) as parameters to the server started by the script, there is a possibility of "indirect" control of VS Code in real time. For example, it is quite convenient to start with the project build scripts, or the task manager (gulp, etc.). In this case, without complicating it, we start, restart, and stop the VS Code debugger with simple GET requests through the browser address bar.

Starting the server:

![041](https://user-images.githubusercontent.com/5076458/122554661-f4983700-d041-11eb-9ede-d304ab1a39f6.gif)

Starting debugging:

![042](https://user-images.githubusercontent.com/5076458/122554699-011c8f80-d042-11eb-9aa0-485cad05ae07.gif)

Restart:

![043](https://user-images.githubusercontent.com/5076458/122554865-2d381080-d042-11eb-988d-6646580cb944.gif)

Finish debugging and stop the server:

![044](https://user-images.githubusercontent.com/5076458/122555000-5eb0dc00-d042-11eb-8263-8111f000a104.gif)

It is possible to get many commands from the VS Code itself:

![51](https://user-images.githubusercontent.com/5076458/122555232-b2bbc080-d042-11eb-9a05-fe431fcc85f3.jpg)

![52](https://user-images.githubusercontent.com/5076458/122555237-b3eced80-d042-11eb-83d2-6ac8daf706c3.jpg)

# The work of the extension.

The extension reads the array **contextScripts** property from the **settings file.json**, each element of which is a **metadata object of a single script**. Then, using their **path**, it connects all the scripts as modules, thereby giving them access to the runtime context of the environment. Each metadata object has the following properties:

- *name* - (required) the name of the script (displayed in the error log).
- *path* - (required) the path where the script is located.
- *parameters* - (optional) an object with data that will be passed to the script as a parameter.

In the script file, two functions are important to the extension:

- *activate(params)* - (required) is called when the script is run, with an optional parameter that takes the object of the data passed to the script **parameters** from the settings file.
- *activate()* - (optional) called when scripts are turned off.

Also, for debugging purposes, the **ctxLog()** extension function is available in the global scope, which takes a string argument and outputs it to the VSContext extension output channel.

# Useful links.

[The main resource for writing VS Code extensions](https://code.visualstudio.com/api). And there, among other things:

- [VS Code API]() - full API of the development environment.
- [Built-in Commands](https://code.visualstudio.com/api/references/commands) - another small list of commands available for execution by the **vscode.commands.ExecuteCommand** method.
