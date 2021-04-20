<div align="center"><ins>

![Logo](https://user-images.githubusercontent.com/5076458/110127198-666fac00-7dd6-11eb-9822-ccc973f41ee6.png)

[Русский](/README_RU.md)

</ins></div>

WebDevSynergy is a simple and reconfigurable web development environment. All that is needed for the environment to work is an installed [**NodeJS**](https://nodejs.org). Features:
1. **Independence from any IDE** (but nothing interferes, and it is even recommended, to use this environment in conjunction with your preferred IDE).
2. **Easy customizability** (you can either disable/remove existing modules, or connect new ones according to the template).

In this example, only the following features are implemented:
1. A "live server" for testing the application in a browser based on [Browsersync](https://www.browsersync.io/).
2. Compilation features implemented with [Gulp](https://gulpjs.com/):
   * Typescript -> JavaScript;
   * Pug -> HTML;
   * Stylus -> css.
3. A simple and fast way to show the result of your work over the Internet using [Localtunnel](https://theboroer.github.io/localtunnel-www/)

The [Gulp](https://gulpjs.com/) (task manager) modules are turned on/off through the _gulpfile.js/config-wds.js_ configuration file.
 
# How to install and configure.
Step|Description|Screenshot
:-:|-|-
1| Download and install [NodeJS](https://nodejs.org/en/) (see instructions on the NodeJS website).| ![NodeJS](https://nodejs.org/static/images/logo-light.svg)
2| [Download](https://github.com/IPcorps/WebDevSynergy/archive/main.zip) and unpack this repository to a place convenient for you (or you can use git commands).|![02](https://user-images.githubusercontent.com/5076458/110133984-fa914180-7ddd-11eb-8e98-b14a93e539de.jpg)
3| Open your console and **navigate to the unzipped folder**, where run the command  _**npm install**_ to initialize the environment and load the necessary modules.|![04](https://user-images.githubusercontent.com/5076458/110135037-1c3ef880-7ddf-11eb-9054-96694d3ed05b.jpg)
4| To start, use the following commands:<br>&nbsp;&nbsp;&nbsp;* Starting a "live server" - **npm run rls**.<br>&nbsp;&nbsp;&nbsp;* Starting file monitoring and compiling: typescript -> javascript, pug -> html, etc. - **npm run rfw**.<br>&nbsp;&nbsp;&nbsp;* If necessary show the development result (you need an already working "live server") - **npm run lt**. As a result, you will get a temporary link that you can share, and by which everyone can go to the running " live server" |![05](https://user-images.githubusercontent.com/5076458/110136489-ccf9c780-7de0-11eb-8f44-238394d84fcd.jpg)

Your development application will be located in the _app_ folder (it's customizable). Now open, for example, in notepad the _main.ts_ file from the _app_ folder, change it and save it. You will see how the page in the browser refreshes and displays the changes.

# "Under the hood".

 How it works. Saving files with _.ts_, _.pug_, and other extensions is tracked by [Gulp](https://gulpjs.com/) and immediately translated to _.js_, _.​​html_ and other, respectively. In turn, changes in the files with the _.js_, _.html_ and other extensions are monitored by [Browsersync](https://www.browsersync.io/), which will immediately refresh the page in the browser. You can organize your files into separate folders within _app_, [Gulp](https://gulpjs.com/) will always create a final file next to the original.

# Note.

Using the features of [Gulp](https://gulpjs.com/), you can add any functionality you need. It shouldn't be difficult to understand the structure of the code in the _gulpfile.js_ folder. [Browsersync](https://www.browsersync.io/) and [Gulp](https://gulpjs.com/) are much more powerful than the capabilities used here. But that's another story, which you can learn more about on their official pages.

This environment does not depend on the IDE, and you can write the code in any text editor. But it is much more convenient and efficient to use the IDE for this, and it does not matter which one. Consider working with [Visual Studio Code](https://code.visualstudio.com/) as an example in the next section.

# Let's make friends [Visual Studio Code](https://code.visualstudio.com/) and [WebDevSynergy](https://github.com/IPcorps/WebDevSynergy).
Step|Description|Screenshot
:-:|-|-
1| Download and install [NodeJS](https://nodejs.org/en/) (see instructions on the NodeJS website).| ![NodeJS](https://nodejs.org/static/images/logo-light.svg)
2| [Download](https://github.com/IPcorps/WebDevSynergy/archive/main.zip) and unpack this repository to a place convenient for you (or you can use git commands).|![02](https://user-images.githubusercontent.com/5076458/110133984-fa914180-7ddd-11eb-8e98-b14a93e539de.jpg)
3| Launch VSC and open a folder in it.|![14](https://user-images.githubusercontent.com/5076458/110156516-1c97bd80-7df8-11eb-9602-70e8b44bc8bc.jpg)
4| You can use the built-in terminal to initialize the environment and download the required packages by running the _npm install_ command in it.|![15](https://user-images.githubusercontent.com/5076458/113714079-b18c2000-96f0-11eb-927e-d5723c75ed8e.jpg)
5| In the lower left corner, in the _NPM SCRIP_ tab, you can see the available commands that can be used to run the "live server" [Browsersync](https://www.browsersync.io/) (_rls_), [Gulp](https://gulpjs.com/) compilation scripts (_rfw_), and the module [Localtunnel](https://theboroer.github.io/localtunnel-www/) (_lt_). You can also change the names to more readable ones in the _package.json_ settings file in the _scripts_ section.|![16](https://user-images.githubusercontent.com/5076458/113714098-b8b32e00-96f0-11eb-9ea4-03c9f84fab4a.jpg)

But that's not all. For more convenience, you can do the following:

Step|Description
:-:|-
6| Add start and stop task data to VSC environment tasks. To do this, create a _.vscode_ folder and a _tasks.json_ file in it. Add the following to it:
    {
    	"version": "2.0.0",
    	"tasks": [
    		{
    			"label": "Run live server",
    			"type": "npm",
    			"script": "rls",
    			"problemMatcher": [],
    			"presentation": {
    				"group": "dev"
    			}
    		},
    		{
    			"label": "Run files watcher",
    			"type": "npm",
    			"script": "rfw",
    			"problemMatcher": [],
    			"presentation": {
    				"group": "dev"
    			}
    		},
    		{
    			"label": "Local tunnel",
    			"type": "npm",
    			"script": "lt",
    			"problemMatcher": [],
    			"presentation": {
    				"group": "dev"
    			}
    		}
    	]
    }
![17](https://user-images.githubusercontent.com/5076458/113714122-bf41a580-96f0-11eb-987c-81d1079e3b35.jpg)
Step|Description|Screenshot
:-:|-|-
7| You can run tasks from the control line _Ctrl+P_ and type _>Tasks: Run Task_ and then select the desired task.|![18](https://user-images.githubusercontent.com/5076458/113714135-c36dc300-96f0-11eb-9ba0-e2064fc6a16c.gif)
8| You can also install any manager or task explorer and use it.|![19](https://user-images.githubusercontent.com/5076458/113714168-c799e080-96f0-11eb-8308-d95cccd73345.jpg)

# As a result, we ended up with something like this 😎 :

![Fin](https://user-images.githubusercontent.com/5076458/113714180-cb2d6780-96f0-11eb-8cb9-87b3a1f5b942.gif)