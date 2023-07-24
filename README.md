# towering-terrors
hosting of scripts for mediawiki site. This makes things simpler than hosting all the custom content on the mediawiki install.
also, better for people to see the source behind the site without seeing the whole install... if they could see the whole install I think that's a security risk.

#### 27th of Jun

Still working on the website, just setup the git repository for it, so I can track changes and roll back if I need to. This happened after an especially stressful period of doing mass changes to the very architecture of the site, and realised I had made no backups. I am truly an idiot in this sense.

I'm going to start making a new version of "generalFunctions.js", adding multiple interaction catagories/shapes/whatever you'd like to call them, so there can be multiple points of interaction in a screen.

Luckily I'm choosing to do this relatively early in the process, so there isn't too many scripts I will have to drastically change. That being said, it's no easy task.

Someone's playing a loud "waresque" trumpet outside my window, and preaching christianity.

I did it. Involved setting up a namespace, that each interaction point could have it's own variable within. I used a namespace because it is the only way to create a variable that is named after a string, inputted at runtime.

All these problems arise from creating one script which is meant to have functionality across multiple scripts.

idk it's hard to explain, you can imagine my distress trying to research the subject. Take a look at the GeneralFunctionsUpdated.js script, and you'll see a bit more what I mean.

I'm using GeneralFunctionsUpdated.js for the new scripts I'm writing, but I'm not gonna change the old one, or the old scripts that use it. Best to spend my time elsewhere.

#### 28th of Jun

Adding small walking scenes to each of the interactions on the "village" page, relatively easy job, and also I enjoy making these "custom pages" because it allows me to momentarily escape the blessing and/or curse that is the mediawiki software.

I'm consistently worried about how I'm coding this website... I have a tendancy to completely spaghettify the whole framework. After about 50 hours of work, the code becomes completely impossible to work on, as none of the things I have coded prior can be built on without fucking up five other things.

I don't know how I'm going to go about avoiding this situation. I'm not a proffesional coder, so I don't know good coding practices when working on a large codebase.

I guess a mind-map? Sounds lame.

#### 1st of July

I've had a few ideas, one, a sound board, a seperate window that can play sounds, picked by the user. These sounds accompany pages. Not sure if good idea.

Two, a series of videos, slightly hidden in the maze. Written word spoken by someone that is not me, seperate but conjoined with the narrative. Maybe I should write that first.

Still need to get the sound working on some of the webpages, but I don't want to work on that now.

Also I could do like an inventory style system... I wanted to have the user download files, and be able to upload them to another webpage to "place them in inventory"...

Or wait maybe I don't have an inventory I just use windows for keys, locks almost. The inventory is just their filesytem. They can download keys in the form of JSON files.
