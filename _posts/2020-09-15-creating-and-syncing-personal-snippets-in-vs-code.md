---
layout: post
title:  "Creating and syncing personal snippets in VS Code"
date:   2020-09-15 14:28:36 +0100
categories: vscode
---

I recently started a new side project in a language (Perl) and framework (Logitech Media Server AKA Slim Server) I’d never used before. This combination and my lack of experience meant there was no way of debugging, it was log everything and muddle your way through.

**Don’t panic! What I’m going to describe is completely agnostic to the language/frameworks used.**

I use Visual Studio Code as my editor of choice for most things these days and I was getting fed up with typing the same old things over and over, so I looked into what options VS Code had to make some of this repetition easier.

It turns out VS Code has a very mature snippet facility and getting it working was pretty trivial. This isn’t going to be a tutorial on everything snippet related but a get you started with what I found useful.

Snippets are at 3 levels; Project, Language and Global. For my use case I wanted some language level ones and some global ones since I’m looking at more than one project using Slim. 

Within VS Code you can add snippets using File > Preferences > User Snippets (Code > Preferences > User Snippets on macOS) 
- If you are creating a language snippet choose the language.  
- If you are creating a global (framework) snippet choose New Global Snippets File.  
- If you are creating a project level snippet choose New Snippets File for &lt;your project&gt;

With all of these you get a commented out starter json file.  

First I created some perl language helpers. 

# Language Snippets
{% gist 0f80e0517c4a2ad18478bdc2020f66d1 %}

This is fairly straight forward, a simple IF and FOR statement.
The $1 and $2 are completion tabs, the $0 is where you want your cursor after the completions are made. Unfortunately Perl makes extensive use of $ symbols itself so on the FOR statement I had to escape them.
The prefix is what you need to type to have these snippets suggested.

With this file saved when I type “if” within a Perl file I get a suggestion, the snippet is actually the second one offered, pressing down then tab inserts the snippet and positions the cursor at the $1 position ready for you to type your condition.

# Global Snippets
Global snippets are very similar to language snippets except they can contain elements relevant to multiple languages. I wanted one relevant to the Slim framework which is a mixture of Perl and HTML code. Here’s an extract of what I ended up with.

{% gist 44e00c8ce4a6e8d7c72ae7a872847c7f %}

The only thing to hi-light here is the “scope” element to indicate which language a snippet is relevant for.
For the “prefix” element I started all my snippets with slim… to make it easy to get suggestions for something to do with the slim framework.

# Project Snippets
These are exactly the same as global snippets but they are located within the .vscode folder of your project.

## Syncing
I also wanted to share these snippets I’d created with my partner in crime on this project so I wanted a way to sync them. With Project level snippets that’s easy, just check in the relevant files within the .vscode folder and it’s done. But I wanted to share the language and global snippets.

These weren’t going to change much so I wasn’t after an automated continual syncing mechanism, just a way to easily grab them and update our local copies. I opted for using GitHub to share a project containing these snippets and setting up symbolic links to put them in the right folder for VS Code to use.

On MacOS these files are stored in your User/Library whilst Windows it’s User/AppData. Here’s the commands I used to create those symlinks from my usual projects folder over to where VS Code is looking for them. If you already have a snippets folder in your app data folder the symlink command will fail, you’ll have to delete the snippets folder to be able to create the symlink (just make sure to backup any existing snippets you may have).

**Mac**
{% highlight plaintext %}
ln -s /Users/<USER>/<YOUR FOLDER>/vscode-snippets/snippets/ /Users/<USER>/Library/Application\ Support/Code/User/snippets
{% endhighlight %}

**Windows**
{% highlight plaintext %}
mklink /D c:\Users\<USER>\AppData\Roaming\Code\User\snippets c:\<YOUR FOLDER>\vscode-snippets\snippets
{% endhighlight %}

Any changes you make to the snippets within either the app data folder or your checkout folder will be instantly updated (actually they are the same file) so you can push/pull your git repo to update your snippets.
Publishing Snippets as an Extension

Whilst I am not going to publish these snippets as an extension, if you create a great set with wide appeal you can wrap up your snippets into an extension. I’m not going to cover that, but if you are interested there’s more info on the official Microsoft VS Code help site [here](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

I hope you found this article useful and it inspires you to create some snippets of your own and hopefully share them to aid a newbie to a particular language/framework/project.